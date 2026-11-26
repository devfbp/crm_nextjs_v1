import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  const token = getSessionFromToken();
  const activeTab = request.nextUrl.searchParams.get('activeTab');
  try {
    const where = { flag: 0 };

    // Which RM(s) the board is scoped to (undefined = everyone):
    //   "My Board"   (activeTab 0): the user, unless they're an admin (role_id <= 2)
    //   "Team Board" (activeTab 1): the user and their team members
    // Team members are fetched once here (they used to be re-fetched for
    // every count).
    let rmScope;
    if (activeTab == 0 && token?.user_id && token?.role_id > 2) {
      rmScope = token.user_id;
    } else if (activeTab == 1) {
      rmScope = token.user_id;
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
        rmScope = { in: [token.user_id, ...memberIds] };
      }
    }
    const scoped = (filter) => (rmScope === undefined ? filter : { ...filter, rm_user_id: rmScope });

    // Calculate start and end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // All of these are independent, so run them at the same time instead of
    // one after another.
    const [
      totalLeads,
      callsDoneTodays,
      totalLeadsTodays,
      svds,
      closures,
      lead_status,
      counts,
      LastBookingDate,
      dueCount,
      overdueCount,
      revenueAmount,
    ] = await Promise.all([
      // Total open leads
      prisma.lead.count({
        where: scoped({
          flag: 0,
          lead_status_id: {
            notIn: [6, 7]
          }
        })
      }),
      // Today's calls done (any status change except "new")
      prisma.lead_status_entry.groupBy({
        by: ['lead_id'],
        where: scoped({
          created_at: { gte: startOfDay, lt: endOfDay },
          to_status_id: { not: 1 },
          flag: 0
        }),
        _count: {
          lead_id: true
        }
      }),
      // Today's new leads (to_status_id = 1)
      prisma.lead_status_entry.groupBy({
        by: ['lead_id'],
        where: scoped({
          created_at: { gte: startOfDay, lt: endOfDay },
          to_status_id: 1,
          flag: 0
        }),
        _count: {
          lead_id: true
        }
      }),
      // SVD (to_status_id = 5)
      prisma.lead_status_entry.groupBy({
        by: ['lead_id'],
        where: scoped({
          to_status_id: 5,
          flag: 0
        }),
        _count: {
          lead_id: true
        }
      }),
      // Closures (to_status_id = 7)
      prisma.lead_status_entry.groupBy({
        by: ['lead_id'],
        where: scoped({
          to_status_id: 7,
          flag: 0
        }),
        _count: {
          lead_id: true
        }
      }),
      // All lead statuses
      prisma.lead_status.findMany({ where }),
      // Counts grouped by to_status_id
      prisma.lead_status_entry.groupBy({
        by: ['to_status_id'],
        _count: { to_status_id: true }
      }),
      prisma.lead.findFirst({
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
      }),
      // due and overdue counts
      prisma.lead.count({
        where: {
          flag: 0,
          schedule_date: { gte: todayStart, lte: todayEnd }
        }
      }),
      prisma.lead.count({
        where: {
          flag: 0,
          schedule_date: { lt: todayStart }
        }
      }),
      prisma.lead.aggregate({
        _sum: {
          revenue: true
        },
        where: scoped({
          flag: 0,
          lead_status_id: 7
        })
      }),
    ]);

    if (lead_status.length === 0) return new Response(JSON.stringify([]), { status: 200 });

    const callsDoneToday = callsDoneTodays.length;
    const totalLeadsToday = totalLeadsTodays.length;
    const svd = svds.length;
    const NumberofClosuresDone = closures.length;

    // Map counts to lead_status
    const countByStatus = new Map(counts.map(c => [c.to_status_id, c._count.to_status_id]));
    const lead_status_with_count = lead_status.map(status => ({
      ...status,
      leadcount: countByStatus.get(status.lead_status_id) || 0
    }));

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
