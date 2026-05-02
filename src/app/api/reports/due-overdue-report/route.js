import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
  // console.log("Received token:", authToken);
  // console.log("Expected token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);
  if (authToken != process.env.NEXT_PUBLIC_BEARER_TOKEN) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const where = { flag: 0 };
    let lead_where = { flag: 0 };
    if (token?.user_id && token?.role_id > 2) {
      lead_where.rm_user_id = token.user_id;
    }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    // due and overdue counts
    // console.log("From Database Query:", todayStart);
    // console.log("From Database Query:", todayEnd);
    const dueCount = await prisma.lead.count({
      where: {
        flag: 0,
        schedule_date: { gte: todayStart, lte: todayEnd }
      }
    });
    const overdueCount = await prisma.lead.count({
      where: {
        flag: 0,
        schedule_date: { lt: todayStart }
      }
    });
    const notscheduledCount = await prisma.lead.count({
      where: {
        flag: 0,
        schedule_date: null
      }
    });
    // console.log(lead_status_with_count);
    return new Response(
      JSON.stringify({ success: true, data: { dueCount, overdueCount, notscheduledCount } }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error fetching leads:', error);
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const dynamic = "force-dynamic";