import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
  let assigned_to = searchParams.get('assigned_to');
  // console.log("Received token:", authToken);
  // console.log("Expected token:", process.env.NEXT_PUBLIC_BEARER_TOKEN);
  if (authToken != process.env.NEXT_PUBLIC_BEARER_TOKEN && process.env.NEXT_PUBLIC_BEARER=="Yes") {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }
  try {
    const where = { flag: 0 };
   
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    let lead_where = {};
    lead_where.created_at = { gte: todayStart, lte: todayEnd };
    lead_where.to_status_id = {not: 1};    
    if (assigned_to) {
      lead_where.rm_user_id = parseInt(assigned_to);
    }
    const callsDoneTodays = await prisma.lead_status_entry_view.groupBy({
      by: ['rm_user_id','user_name'],
      where: lead_where,
      _count: {
        lead_id: true
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