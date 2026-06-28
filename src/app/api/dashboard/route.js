import { no } from 'zod/v4/locales';
import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  const token = getSessionFromToken();
  const { searchParams } = new URL(request.url);    
  const activeTab = request.nextUrl.searchParams.get('activeTab');
  try {
    const where = { flag: 0 };
    let lead_where = {
      flag: 0,
      lead_status_id: {
        notIn: [6, 7]
      }
    };
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      lead_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
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
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      calls_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
      calls_where.rm_user_id = token.user_id;
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
        calls_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
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
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      total_leads_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
      total_leads_where.rm_user_id = token.user_id;
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
        total_leads_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
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
      to_status_id: 5,
      flag: 0
    }
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      total_svd_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
      total_svd_where.rm_user_id = token.user_id;
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
        total_svd_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
    }
    const svds = await prisma.lead_status_entry.groupBy({
      by: ['lead_id'],
      where: total_svd_where,
      _count: {
        lead_id: true
      }
    });
    const svd = svds.length;

    let total_closures_where = {
      to_status_id: 7,
      flag: 0
    }
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      total_closures_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
      total_closures_where.rm_user_id = token.user_id;
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
        total_closures_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
    }
    const closures = await prisma.lead_status_entry.groupBy({
      by: ['lead_id'],
      where: total_closures_where,
      _count: {
        lead_id: true
      }
    });
    const NumberofClosuresDone = closures.length;

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
    let revenue_where = {
      flag: 0,
      lead_status_id: 7
    }
    if (activeTab==0 && token?.user_id && token?.role_id > 2) {
      revenue_where.rm_user_id = token.user_id;
    } else if (activeTab==1 ) {
      revenue_where.rm_user_id = token.user_id;
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
        revenue_where.rm_user_id = { in: [token.user_id, ...memberIds] };
      }
    }
    const revenueAmount = await prisma.lead.aggregate({
      _sum: {
        revenue: true
      },
      where: revenue_where
    });

    return new Response(
      JSON.stringify({ totalLeads, callsDoneToday, totalLeadsToday, svd, lead_status: lead_status_with_count, dueCount, overdueCount, NumberofClosuresDone, LastBookingDate: LastBookingDate?.closed_date || null, TotalRevenue: revenueAmount._sum.revenue || 0 }),
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