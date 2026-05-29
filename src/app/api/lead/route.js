import { email } from 'zod';
import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

/*
INSERT INTO `lead_file` (`lead_file_id`, `lead_file_name`, `file_path`, `created_at`, `created_by`, `modified_at`, `modified_by`, `company_id`, `flag`) VALUES (NULL, 'Manual', '/', NULL, NULL, NULL, NULL, '0', '0');
*/
export async function GET(request) {
  const token = getSessionFromToken();
  const todayStart = new Date();
  // todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  // todayEnd.setHours(23, 59, 59, 999);

  const dashboardQry = null;
  try {
    const { searchParams } = new URL(request.url);

    const id = parseInt(searchParams.get('id'));
    let limit = parseInt(searchParams.get('limit')) || 100;
    let page = parseInt(searchParams.get('page')) || 1;
    let orderBy = searchParams.get('orderBy') || 'modified_at';
    let view = searchParams.get('view');
    let due_filter = searchParams.get('due_filter');
    let assigned_to = searchParams.get('assigned_to');
    let lead_status_id = searchParams.get('lead_status_id');
    let dd_callsDoneToday = searchParams.get('dd_callsDoneToday');
    let dd_totalLeadsToday = searchParams.get('dd_totalLeadsToday');
    let dd_svd = searchParams.get('dd_svd');
    let dd_closure = searchParams.get('dd_closure');
    let search = searchParams.get('search') || "";
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


export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const duplicateLead = await prisma.lead.findFirst({
      where: {
        mobile_no: req.mobile_no,
        // project_id: parseInt(req.project_id),
        flag: 0
      }
    });
    if (duplicateLead) {
      return Response.json({ duplicateLead: true, success: false, message: "Lead with this mobile number already exists for the selected project." }, { status: 400 });
    }
    const newlead = await prisma.lead.create({
      data: {
        created_at: new Date(),
        schedule_date: new Date(),
        created_by: token?.user_id || null,
        customer_name: req.customer_name,
        mobile_no: req.mobile_no,
        email_id: req.email_id ? req.email_id : null,
        alternate_no: req.alternate_no ? req.alternate_no : null,
        whatsapp_no: req.whatsapp_no ? req.whatsapp_no : null,
        alternate_email: req.alternate_email ? req.alternate_email : null,
        project_id: parseInt(req.project_id),
        source_id: parseInt(req.source_id),
        sub_source_id: parseInt(req.sub_source_id),
        rm_user_id: parseInt(req.rm_user_id),
        lead_status_id: parseInt(req.lead_status_id),
        lead_file_id: parseInt(1),
        remarks: req.remarks
      }
    });
    if (newlead) {
      await prisma.lead_status_entry.create({
        data: {
          lead_id: newlead?.lead_id,
          created_by: token?.user_id ?? null,
          created_at: new Date(),
          from_status_id: 0,
          to_status_id: 1,
          from_rm_user_id: token?.user_id ?? null,
          rm_user_id: token?.user_id ?? null,
          remarks: "New Lead Created"
        },
      });
    }
    return Response.json({
      success: true,
      message: "Lead created successfully.",
      lead: newlead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const id = req.slug;
    const duplicateLead = await prisma.lead.findFirst({
      where: {
        mobile_no: req.mobile_no,
        // project_id: parseInt(req.project_id),
        lead_id: { not: id },
        flag: 0
      }
    });
    if (duplicateLead) {
      return Response.json({ success: false, message: "Lead with this mobile number already exists for the selected project." }, { status: 400 });
    }
    const beforeLeadData = await prisma.lead.findUnique({
      where: { lead_id: id }
    });
    console.log("Schedule Date:", new Date(req?.schedule_date));
    const updatedlead = await prisma.lead.update({
      where: { lead_id: id },
      data: {
        modified_at: new Date(),
        customer_name: req.customer_name,
        mobile_no: req.mobile_no,
        email_id: req.email_id,
        alternate_no: req.alternate_no,
        whatsapp_no: req.whatsapp_no,
        alternate_email: req.alternate_email,
        project_id: parseInt(req.project_id),
        source_id: parseInt(req.source_id),
        sub_source_id: parseInt(req.sub_source_id),
        rm_user_id: parseInt(req.rm_user_id),
        lead_status_id: parseInt(req.lead_status_id),
        remarks: req.remarks,
        schedule_date: req?.schedule_date ? new Date(req?.schedule_date) : null, // use the parsed Date object
        modified_by: token?.user_id || null,
        closed_date: req?.closed_date ? new Date(req?.closed_date) : null, // use the parsed Date object
        revenue: req?.revenue ? parseFloat(req?.revenue) : 0
      }
    });
    if (updatedlead) {
      await prisma.lead_status_entry.create({
        data: {
          lead_id: updatedlead?.lead_id,
          created_by: token?.user_id ?? null,
          created_at: new Date(),
          from_status_id: beforeLeadData?.lead_status_id ?? 0,
          to_status_id: updatedlead.lead_status_id,
          from_rm_user_id: beforeLeadData?.rm_user_id ?? null,
          rm_user_id: updatedlead?.rm_user_id ?? null,
          remarks: req.status_remarks ? req.status_remarks : "Status Updated"
        },
      });
    }
    if (updatedlead && req.send_email) {
      // console.log("Sending email notification for lead update...");
      let html_body = `<h1>Lead Assigned</h1>
      <p>The Following Lead Assigned to you, Please check and follow up.</p>

      <!-- Table -->
      <table class="content-table">
        <tr>
          <th>Lead ID</th>
          <th>URL</th>
        </tr>
        <tr>
          <td>` + updatedlead.lead_id + `</td>
          <td><a href="` + process.env.NEXT_PUBLIC_BASE_URL + `/lead/` + updatedlead.lead_id + `/edit">View Lead</a></td>
        </tr>
      </table>

      <p>Thank you for being part of our community!</p>`

      try {
        const mail_response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            message: html_body,
            subject: "New Lead Assigned - LID " + updatedlead.lead_id
          })
        });
        // console.log("Email notification response:", mail_response);
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
    }
    return Response.json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedlead
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting lead with id:", id);
    const deletedlead = await prisma.lead.update({
      where: { lead_id: id },
      data: { flag: 1, modified_by: token?.user_id || null, modified_at: new Date() }
    });
    return Response.json(deletedlead);
  } catch (error) {
    console.error('Error deleting lead:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";
