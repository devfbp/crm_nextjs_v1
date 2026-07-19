import { email } from 'zod';
import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";


export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const id = req.slug;
    // const duplicateLead = await prisma.lead.findFirst({
    //   where: {
    //     mobile_no: req.mobile_no,
    //     // project_id: parseInt(req.project_id),
    //     lead_id: { not: id },
    //     flag: 0
    //   }
    // });
    // if (duplicateLead) {
    //   return Response.json({ success: false, message: "Lead with this mobile number already exists for the selected project." }, { status: 400 });
    // }
    const beforeLeadData = await prisma.lead.findUnique({
      where: { lead_id: id }
    });
    console.log("Schedule Date:", new Date(req?.schedule_date));
    const data = {
      modified_at: new Date(),
      lead_status_id: parseInt(req.lead_status_id)      
    };
    if (req.rm_user_id) {
      data.rm_user_id = parseInt(req.rm_user_id);
    }
    if (req.schedule_date) {
      data.schedule_date = req?.schedule_date ? new Date(req.schedule_date) : null;
      data.schedule_date_time = req?.schedule_date ? new Date(req.schedule_date) : null;
    }
    const updatedlead = await prisma.lead.update({
      where: { lead_id: id },
      data: data
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
          remarks: req.status_remarks ? req.status_remarks + " - App" : "Status Updated in App"
        },
      });
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
export const dynamic = "force-dynamic";
