import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
  const rm_user_id = request.nextUrl.searchParams.get("rm_user_id");
  const from_date = request.nextUrl.searchParams.get("from_date");
  const to_date = request.nextUrl.searchParams.get("to_date");
  if (authToken != process.env.NEXT_PUBLIC_BEARER_TOKEN && process.env.NEXT_PUBLIC_BEARER == "Yes") {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    var todayStart = new Date();
    var todayEnd = new Date();
    if (from_date) {
      todayStart = new Date(from_date);
    }
    if (to_date) {
      todayEnd = new Date(to_date);
    }
    todayStart.setHours(0, 0, 0, 0);    
    todayEnd.setHours(23, 59, 59, 999);

    let lead_where = {};
    lead_where.created_at = { gte: todayStart, lte: todayEnd };
    lead_where.to_status_id = { not: 1 };
    if (token?.user_id && token?.role_id > 2 && !rm_user_id) {
      lead_where.rm_user_id = token.user_id;
      const teamMembers = await prisma.user_team_member.findMany({
        where: {
          leader_id: token.user_id,
          flag: 0
        },
        select: {
          member_id: true
        }
      });
      if (teamMembers && teamMembers.length > 0) {
        const memberIds = teamMembers.map(member => member.member_id);
        lead_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
    } else if (rm_user_id) {
      lead_where.rm_user_id = parseInt(rm_user_id);
    }
    const callsDoneTodays = await prisma.lead_status_entry_view.groupBy({
      by: ['rm_user_id', 'user_name'],
      where: lead_where,
      _count: {
        lead_id: true
      },
      orderBy: {
        _count: {
          lead_id: 'desc'
        }
      }
    });


    return new Response(
      JSON.stringify({ success: true, data: callsDoneTodays }),
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