import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const token = getSessionFromToken();
  const todayStart = new Date();
  const todayEnd = new Date();
  // todayStart.setHours(0, 0, 0, 0);
  todayEnd.setHours(23, 59, 59, 999);
  try {
    const leadsData = await prisma.lead.findMany({
      where: {
        schedule_date_time: {
          gte: todayStart,
          lte: todayEnd,
        },
        rm_user_id: token.user_id,
      },
      orderBy: {
        schedule_date_time: 'asc',
      },
    });
    return new Response(
      JSON.stringify({
        success: true,
        data: leadsData
      }),
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Error updating leads:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Something went wrong"
      }),
      { status: 500 }
    );
  }
}
