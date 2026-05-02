import { no } from 'zod/v4/locales';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export async function GET(request) {
  const token = getSessionFromToken();
  const bearer = request.headers.get("Authorization") || "";
  const authToken = bearer.replace("Bearer ", "").trim();
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
    let lead_where = { flag: 0 };
    if (token?.user_id && token?.role_id > 2) {
      lead_where.rm_user_id = token.user_id;
    }
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    
    const deadLeadsCount = await prisma.lead_status_entry.count({
      where: {
        flag: 0,
        created_at: { gte: todayStart, lte: todayEnd },
        to_status_id: 6
      }
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