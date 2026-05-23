import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
  const rm_user_id = searchParams.get("rm_user_id");
  const from_date = searchParams.get("from_date");
  const to_date = searchParams.get("to_date");
  // console.log("Received token:", authToken);
  // console.log("Expected token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);
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
    let lead_where = { flag: 0 };
    // lead_where.schedule_date = { gte: todayStart, lte: todayEnd };
    lead_where.status_id = { notIn: [6, 7] }; // Exclude New and Closed leads
    if (rm_user_id) {
      lead_where.rm_user_id = parseInt(rm_user_id);
    }
    if (from_date && to_date) {
      lead_where.schedule_date = { gte: todayStart, lte: todayEnd };
    } else {
      lead_where.OR = [
        {
          schedule_date: {
            lt: todayStart,
          },
        },
        { schedule_date: null }
      ];
    }
    var leadAssignedDay = await prisma.leads_view.groupBy({
      by: ['rm_user_id', 'assigned_to'],
      where: lead_where,
      _count: {
        lead_id: true
      },
      orderBy: {
        _count: {
          lead_id: 'desc',
        },
      },
    });

    return new Response(
      JSON.stringify({ success: true, data: leadAssignedDay }),
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