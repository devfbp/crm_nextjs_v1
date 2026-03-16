import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const where = { flag: 0 };
    
    // Calculate start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);

    // Total leads
    const totalLeads = await prisma.lead.count({ where });

    // Today's calls done (to_status_id = 3)
    const callsDoneToday = await prisma.lead_status_entry.count({
      where: {
        created_at: { gte: startOfDay, lt: endOfDay },
        to_status_id: 3
      }
    });

    // Today's new leads (to_status_id = 1)
    const totalLeadsToday = await prisma.lead_status_entry.count({
      where: {
        created_at: { gte: startOfDay, lt: endOfDay },
        to_status_id: 1
      }
    });

    // Today's SVD (to_status_id = 5)
    const svd = await prisma.lead_status_entry.count({
      where: {
        created_at: { gte: startOfDay, lt: endOfDay },
        to_status_id: 5
      }
    });

    // Fetch all lead statuses
    const lead_status = await prisma.lead_status.findMany({ where });
    if (lead_status.length === 0) return new Response(JSON.stringify([]), { status: 200 });

    // Fetch counts grouped by to_status_id
    const counts = await prisma.lead_status_entry.groupBy({
      by: ['to_status_id'],
      _count: { to_status_id: true }
    });
    // console.log(counts);
    // Map counts to lead_status
    const lead_status_with_count = lead_status.map(status => {
      const countObj = counts.find(c => c.to_status_id === status.lead_status_id);
      return {
        ...status,
        leadcount: countObj?._count.to_status_id || 0
      };
    });
    // console.log(lead_status_with_count);
    return new Response(
      JSON.stringify({ totalLeads, callsDoneToday, totalLeadsToday, svd, lead_status: lead_status_with_count }),
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