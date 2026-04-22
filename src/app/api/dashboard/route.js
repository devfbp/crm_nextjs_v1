import { no } from 'zod/v4/locales';
import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  const token = getSessionFromToken();
  try {
    const where = { flag: 0 };
    let lead_where = { flag: 0 };
    if (token?.user_id && token?.role_id > 2) {
      lead_where.rm_user_id = token.user_id;
    }
    // Calculate start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);

    // Total leads
    const totalLeads = await prisma.lead.count({ where: lead_where });

    // Today's calls done (to_status_id = 3)
    let calls_where = {
      created_at: { gte: startOfDay, lt: endOfDay },
      to_status_id: {not: 1},
      flag: 0
    }
    if (token?.user_id && token?.role_id > 2) {
      calls_where.rm_user_id = token.user_id;
    }
    const callsDoneTodays = await prisma.lead_status_entry.groupBy({
      by: ['lead_id'],
      where: calls_where,
      _count: {
        lead_id: true
      }
    });

    const callsDoneToday = callsDoneTodays.length;

    // Today's new leads (to_status_id = 1)
    let total_leads_where = {
      created_at: { gte: startOfDay, lt: endOfDay },
      to_status_id: 1,
      flag: 0
    }
    if (token?.user_id && token?.role_id > 2) {
      total_leads_where.rm_user_id = token.user_id;
    }
    const totalLeadsTodays = await prisma.lead_status_entry.groupBy({
      by: ['lead_id'],
      where: total_leads_where,
      _count: {
        lead_id: true
      }
    });

    const totalLeadsToday = totalLeadsTodays.length;

    // Today's SVD (to_status_id = 5)
    let total_svd_where = {
      created_at: { gte: startOfDay, lt: endOfDay },
      to_status_id: 5,
      flag: 0
    }
    if (token?.user_id && token?.role_id > 2) {
      total_svd_where.rm_user_id = token.user_id;
    }
    const svds = await prisma.lead_status_entry.groupBy({
      by: ['lead_id'],
      where: total_svd_where,
      _count: {
        lead_id: true
      }
    });
    const svd = svds.length;

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

    const NumberofClosuresDone = lead_status_with_count.find(s => s.lead_status_id === 7)?.leadcount || 0;

    const NumberofDaysLastBookingDone = 0;

    const LastBookingDate = await prisma.lead.findFirst({
      where: {
        flag: 0,
        lead_status_id: 7,
        rm_user_id: token?.user_id && token?.role_id > 2 ? token.user_id : undefined
      },
      orderBy: {
        closed_date: 'desc'
      },
      select: {
        closed_date: true
      }
    });

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);


    // due and overdue counts
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
    // console.log(lead_status_with_count);
    return new Response(
      JSON.stringify({ totalLeads, callsDoneToday, totalLeadsToday, svd, lead_status: lead_status_with_count, dueCount, overdueCount, NumberofClosuresDone, LastBookingDate: LastBookingDate?.closed_date || null }),
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