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
  if (authToken != process.env.NEXT_PUBLIC_BEARER_TOKEN && process.env.NEXT_PUBLIC_BEARER=="Yes") {
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

    var where = { flag: 0, status_id: 6 };
    if (from_date && to_date) {
      where.created_at = { gte: todayStart, lte: todayEnd };
    }
    if (rm_user_id) {
      where.rm_user_id = parseInt(rm_user_id);
    }
    
    const deadLeadsCount = await prisma.leads_view.count({
      where: where
    });
    // console.log(lead_status_with_count);
    return new Response(
      JSON.stringify({ success: true, data: { deadLeadsCount } }),
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