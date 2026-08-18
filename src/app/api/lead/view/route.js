import { email } from 'zod';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

/*
INSERT INTO `lead_file` (`lead_file_id`, `lead_file_name`, `file_path`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES (NULL, 'Manual', '/', NULL, NULL, NULL, NULL, '0', '0');
*/
export async function POST(request) {
  const token = getSessionFromToken();
  const todayStart = new Date();
  // todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  // todayEnd.setHours(23, 59, 59, 999);

  const dashboardQry = null;
  try {
    const { searchParams } = new URL(request.url);

    let body = await request.json();
    let view = body.view || "0";
    let id = body.id ? parseInt(body.id) : undefined;
    let limit = parseInt(body.limit) || 100;
    let page = parseInt(body.page) || 1;
    let orderBy = body.orderBy || "modified_at";
    let due_filter = body.due_filter;
    let assigned_to = body.assigned_to;
    let lead_status_id = body.lead_status_id;
    let dd_callsDoneToday = body.dd_callsDoneToday;
    let dd_totalLeadsToday = body.dd_totalLeadsToday;
    let dd_svd = body.dd_svd;
    let dd_closure = body.dd_closure;
    let search = body.search || "";
    let report = body.report || "";
    let lead_ids = body.lead_ids || "";
    let project_id = body.project_id || "";
    let from_date = body.from_date || "";
    let to_date = body.to_date || "";

    if (id) {
      const dataItem = await prisma.lead.findMany({
        where: { lead_id: id },
        orderBy: { modified_at: 'asc' }
      });
      const dataItems2 = await prisma.leads_view.findMany({
        where: { lead_id: id },
        orderBy: { modified_at: 'asc' }
      });
      let finalData = dataItem;
      if (dataItems2 && dataItems2.length > 0) {
        finalData[0].view_data = dataItems2[0];
      }
      return Response.json(finalData);
    }
    else if (report == "1") {
      if (lead_ids) {
        const leadIdsArray = lead_ids.split(',').map(id => parseInt(id.trim()));
        const dataItems = await prisma.leads_view.findMany({
          where: {
            lead_id: { in: leadIdsArray },
            flag: 0
          },
          orderBy: { modified_at: 'asc' }
        });
        return Response.json({ data: dataItems, dashboard: dashboardQry });
      }
    }
    
    if (view == "1") {
      let vwhere = {
        AND: []
      };

      vwhere.AND.push({ flag: 0 });
      if (lead_status_id) {
        vwhere.AND.push({ status_id: parseInt(lead_status_id) });
      } else {
        vwhere.AND.push({ status_id: { notIn: [6, 7] } });
      }
      if (search) {
        vwhere.AND.push({
          OR: [
            { customer_name: { contains: search } },
            { mobile_no: { contains: search } }
          ]
        });
      }
      if (due_filter === "1") {
        todayStart.setHours(0, 0, 0, 0);
        todayEnd.setHours(23, 59, 59, 999);
        vwhere.AND.push({
          OR: [
            {
              schedule_date: {
                gte: todayStart,
                lte: todayEnd,
              },
            },
            {
              AND: [
                { schedule_date: null },
                {
                  created_at: {
                    gte: todayStart,
                    lte: todayEnd,
                  },
                },
              ]
            }
          ]
        });
        vwhere.AND.push({ status_id: { notIn: [6, 7] } });
      }

      if (due_filter === "0") {
        todayStart.setHours(0, 0, 0, 0);
        vwhere.AND.push({
          OR: [
            {
              schedule_date: {
                lt: todayStart,
              },
            },
            { schedule_date: null }
          ]
        });
        vwhere.AND.push({ status_id: { notIn: [6, 7] } });
      }

      if (due_filter === "2") {
        vwhere.AND.push({
          schedule_date: {
            gt: todayEnd,
          }
        });
        vwhere.AND.push({ status_id: { notIn: [6, 7] } });
      }
      if (assigned_to) {
        vwhere.rm_user_id = parseInt(assigned_to);
      }
      if (project_id) {
        vwhere.project_id = parseInt(project_id);
      }
      if (from_date && to_date) {
        var from_date_v = new Date(from_date);
        from_date_v.setHours(0, 0, 0, 0);

        var to_date_v = new Date(to_date);
        to_date_v.setHours(23, 59, 59, 999);

        vwhere.created_at = {
          gt: from_date_v,
          lt: to_date_v,
        };
      } else if (from_date) {
        var from_date_v = new Date(from_date);
        from_date_v.setHours(0, 0, 0, 0);

        vwhere.created_at = {
          gt: from_date_v,
        };
      } else if (to_date) {
        var to_date_v = new Date(to_date);
        to_date_v.setHours(23, 59, 59, 999);

        vwhere.created_at = {
          lt: to_date_v,
        };
      }

      console.log(vwhere)
      /** DATADASHBOARD QUERY********************** */
      if (dd_callsDoneToday === "true") {
        vwhere = {};
        // Today's calls done (to_status_id = 3)
        let calls_where = {
          created_at: { gte: todayStart, lt: todayEnd },
          to_status_id: { not: 1 },
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
        const callsDoneToday = callsDoneTodays.map(item => item.lead_id);
        vwhere.lead_id = { in: callsDoneToday };
        // console.log(callsDoneTodays.length);
      } if (dd_totalLeadsToday === "true") {
        vwhere = {};
        let total_leads_where = {
          created_at: { gte: todayStart, lt: todayEnd },
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

        const totalLeadsToday = totalLeadsTodays.map(item => item.lead_id);
        vwhere.lead_id = { in: totalLeadsToday };
        // console.log(totalLeadsTodays.length);
      } if (dd_svd === "true") {
        vwhere = {};
        let total_svd_where = {
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

        const svdid = svds.map(item => item.lead_id);
        vwhere.lead_id = { in: svdid };
        // console.log(totalLeadsTodays.length);
      } if (dd_closure === "true") {
        vwhere = {};
        let total_closures_where = {
          to_status_id: 7,
          flag: 0
        }
        if (token?.user_id && token?.role_id > 2) {
          total_closures_where.rm_user_id = token.user_id;
        }
        const closures = await prisma.lead_status_entry.groupBy({
          by: ['lead_id'],
          where: total_closures_where,
          _count: {
            lead_id: true
          }
        });

        const closuresid = closures.map(item => item.lead_id);
        vwhere.lead_id = { in: closuresid };
        // console.log(totalLeadsTodays.length);
      } else if (lead_status_id) {
        vwhere.status_id = parseInt(lead_status_id);
      }
      /** DATADASHBOARD END QUERY********************** */
      if (token?.user_id && token?.role_id > 2 && !assigned_to) {
        vwhere.rm_user_id = token.user_id;
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
          vwhere.rm_user_id = { in: [token.user_id, ...memberIds] };
        }
      }
      // console.log(token.user_id);
      console.log("vwhere:", JSON.stringify(vwhere));
      const dataItems = await prisma.leads_view.findMany({
        where: vwhere,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { modified_at: 'asc' }
      });
      const totalCount = await prisma.leads_view.count({
        where: vwhere
      });
      return Response.json({ data: dataItems, dashboard: dashboardQry, total: totalCount });
    }

    const dataItems = await prisma.lead.findMany({
      where: {
        flag: 0
      },
      take: limit,
      orderBy: {
        [orderBy]: 'desc'
      }
    });
    const totalCount = await prisma.lead.count({
      where: {
        flag: 0
      }
    });
    return Response.json({ data: dataItems, dashboard: dashboardQry, total: totalCount });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
