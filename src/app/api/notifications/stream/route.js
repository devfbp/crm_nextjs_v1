import prisma from "../../../../../lib/prisma";
import { getSessionFromToken } from "../../session";

export const dynamic = "force-dynamic";

/**
 * GET /api/notifications/stream
 * SSE endpoint — keeps connection alive and pushes due reminders to the client.
 * Each reminder is pushed when:
 *   1. remind_at <= now
 *   2. is_acknowledged = false
 *   3. notification_count < limit
 *   4. last_notified_at IS NULL OR (now - last_notified_at) >= frequency_value minutes
 * User opens app
 * EventSource connects → /api/notifications/stream
 * poll runs at  0s  → DB check
 * poll runs at 10s  → DB check
 * poll runs at 20s  → DB check
 * ...continues forever...
 * User closes tab / navigates away
 * request.signal aborts → clearInterval(heartbeat) + clearInterval(poll) → connection closed
 */
export async function GET(request) {
  const token = getSessionFromToken();
  if (!token?.user_id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = parseInt(token.user_id);

  const encoder = new TextEncoder();

  // Fetch the SENT status id once
  const sentStatus = await prisma.reminder_status.findFirst({
    where: { name: "SENT" },
  });
  const sentStatusId = sentStatus?.reminder_status_id || 2;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Send a heartbeat every 30s to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: heartbeat\n\n`));
        } catch {
          clearInterval(heartbeat);
        }
      }, 30000);

      // Check for due reminders every 10 seconds
      const poll = setInterval(async () => {
        try {
          const now = new Date();

          const dueReminders = await prisma.lead_reminders.findMany({
            where: {
              is_acknowledged: false,
              remind_at: { lte: now },
              lead: {
                rm_user_id: userId, // Only notify the RM assigned to this lead
              },
            },
            include: {
              lead: {
                select: {
                  lead_id: true,
                  customer_name: true,
                  rm_user_id: true,
                },
              },
            },
          });

          for (const reminder of dueReminders) {
            // Check count < limit
            if (reminder.notification_count >= reminder.limit) continue;

            // Check frequency: if already notified, check if enough time has passed
            if (reminder.last_notified_at) {
              const minutesSinceLast =
                (now.getTime() -
                  new Date(reminder.last_notified_at).getTime()) /
                60000;
              if (minutesSinceLast < reminder.frequency_value) continue;
            }

            // Push SSE event to client
            send({
              lead_reminder_id: reminder.lead_reminder_id,
              lead_id: reminder.lead_id,
              customer_name: reminder.lead?.customer_name || "Unknown",
              message: reminder.message || "You have a lead reminder.",
              remind_at: reminder.remind_at,
              notification_count: reminder.notification_count + 1,
              limit: reminder.limit,
            });

            // Update reminder: increment count, set last_notified_at, add log entry
            await prisma.lead_reminders.update({
              where: { lead_reminder_id: reminder.lead_reminder_id },
              data: {
                notification_count: { increment: 1 },
                last_notified_at: now,
                reminder_logs: {
                  create: {
                    reminder_status_id: sentStatusId,
                    created_at: now,
                  },
                },
              },
            });
          }
        } catch (err) {
          console.error("[SSE] Poll error:", err.message);
        }
      }, 10000);

      // Clean up on disconnect
      request.signal.addEventListener("abort", () => {
        clearInterval(heartbeat);
        clearInterval(poll);
        controller.close();
      });

      // Send an initial ping so the connection shows as "open" immediately
      controller.enqueue(encoder.encode(`: connected\n\n`));
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no", // disable Nginx buffering
    },
  });
}
