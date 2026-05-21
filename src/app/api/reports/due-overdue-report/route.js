import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
  const rm_user_id = request.nextUrl.searchParams.get("rm_user_id");
  const from_date = request.nextUrl.searchParams.get("from_date");
  const to_date = request.nextUrl.searchParams.get("to_date");
  // console.log("Received token:", authToken);
  // console.log("Expected token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);
  if (authToken != process.env.NEXT_PUBLIC_BEARER_TOKEN) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    var todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    var todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    if (from_date) {
      todayStart.setTime(new Date(from_date).getTime());
    }
    if (to_date) {
      todayEnd.setTime(new Date(to_date).getTime());
    }

    var duewhere = { flag: 0, schedule_date: { gte: todayStart, lte: todayEnd } };
    if (rm_user_id) {
      duewhere.rm_user_id = parseInt(rm_user_id);
    }

    var overduewhere = { flag: 0, lead_status_id: { notIn: [6, 7] } };
    if (from_date && to_date) {
      overduewhere.schedule_date = { gte: todayStart, lte: todayEnd };
    } else {
      overduewhere.OR = [
        {
          schedule_date: {
            lt: todayStart,
          },
        },
        { schedule_date: null }
      ];
    }
    if (rm_user_id) {
      overduewhere.rm_user_id = parseInt(rm_user_id);
    }

    var notscheduledwhere = { flag: 0, schedule_date: null };
    if (rm_user_id) {
      notscheduledwhere.rm_user_id = parseInt(rm_user_id);
    }
    const dueCount = await prisma.lead.count({
      where: duewhere
    });
    const overdueCount = await prisma.lead.count({
      where: overduewhere
    });
    const notscheduledCount = await prisma.lead.count({
      where: notscheduledwhere
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