import prisma from '../../../../../lib/prisma';
import { getSessionFromToken } from "../../session";

export const dynamic = "force-dynamic";

export async function PUT(request) {
  const token = getSessionFromToken();

  try {
    const req = await request.json();
    const { lead_ids, lead_status_id, status_remarks, rm_user_id } = req;

    // ✅ Validate input
    if (!Array.isArray(lead_ids) || lead_ids.length === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "lead_ids must be a non-empty array" }),
        { status: 400 }
      );
    }

    if (!lead_status_id) {
      return new Response(
        JSON.stringify({ success: false, message: "lead_status_id is required" }),
        { status: 400 }
      );
    }

    const parsedStatusId = parseInt(lead_status_id);

    // ✅ Process all leads
    const updatedLeads = await Promise.all(
      lead_ids.map(async (item) => {

        const leadId = item?.lead_id;

        const beforeLeadData = await prisma.lead.findUnique({
          where: { lead_id: leadId }
        });

        if (!beforeLeadData) {
          throw new Error(`Lead not found: ${leadId}`);
        }

        // ✅ FIX: use relation instead of lead_status_id
        const updatedLead = await prisma.lead.update({
          where: { lead_id: leadId },
          data: {
            lead_status: {
              connect: {
                lead_status_id: parsedStatusId
              }
            },
            remarks: status_remarks,
            rm_user_id: rm_user_id,
            modified_at: new Date(),
            modified_by: token?.user_id || null
          }
        });

        // ✅ Safe comparison (no relation dependency)
        const beforeStatusId = beforeLeadData.lead_status_id;
        const afterStatusId = parsedStatusId;

        if (beforeStatusId !== afterStatusId) {
          await prisma.lead_status_entry.create({
            data: {
              lead_id: leadId,
              created_by: token?.user_id ?? null,
              created_at: new Date(),
              from_status_id: beforeStatusId ?? 0,
              to_status_id: afterStatusId,
              rm_user_id: rm_user_id ?? null,
              remarks: status_remarks || "Status Updated"
            }
          });
        }

        return updatedLead;
      })
    );

    return new Response(
      JSON.stringify({ success: true, data: updatedLeads }),
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