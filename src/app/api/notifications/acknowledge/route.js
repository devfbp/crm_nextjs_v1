import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from '../../session';

/**
 * POST /api/notifications/acknowledge
 * Body: { lead_reminder_id: number }
 * Marks a reminder as acknowledged, stopping further SSE pushes for it.
 */
export async function POST(request) {
  const token = getSessionFromToken();
  if (!token?.user_id) {
    return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { lead_reminder_id } = await request.json();
    if (!lead_reminder_id) {
      return Response.json({ success: false, message: 'lead_reminder_id is required' }, { status: 400 });
    }

    const acknowledgedStatus = await prisma.reminder_status.findFirst({
      where: { name: 'ACKNOWLEDGED' },
    });
    const acknowledgedStatusId = acknowledgedStatus?.reminder_status_id || 3;

    await prisma.lead_reminders.update({
      where: { lead_reminder_id: parseInt(lead_reminder_id) },
      data: {
        is_acknowledged: true,
        reminder_logs: {
          create: {
            reminder_status_id: acknowledgedStatusId,
            created_at: new Date(),
          },
        },
      },
    });

    return Response.json({ success: true, message: 'Reminder acknowledged.' });
  } catch (error) {
    console.error('[Acknowledge] Error:', error.message);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
