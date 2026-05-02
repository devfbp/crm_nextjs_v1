import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const lead_status_id = parseInt(searchParams.get('lead_status_id'));
    const lead_id = parseInt(searchParams.get('lead_id'));
    const lead_view = parseInt(searchParams.get('lead_view'));
    if (id) {
      const dataItem = await prisma.lead_status_entry.findUnique({
        where: { lead_status_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (lead_status_id) {
      where.lead_status_id = lead_status_id;
    }

    if (lead_view == 1 && lead_id) {
      let dataItems = await prisma.lead_status_entry_view.findMany({
        where: { lead_id: lead_id },
        orderBy: {
          lead_entry_id: 'desc', // or created_at
        },
      });
      return Response.json(dataItems);
    }
    if (lead_view == 2 && lead_id) {
      let dataItems = await prisma.lead_status_entry_view.findFirst({
        where: { lead_id: lead_id },
        orderBy: {
          lead_entry_id: 'desc', // or created_at
        },
      });
      return Response.json(dataItems);
    }
    let dataItems = await prisma.lead_status_entry.findMany({
      where: where
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching lead_statuss:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newlead_status = await prisma.lead_status.create({
      data: {
        lead_status_name: req.lead_status_name,
        created_at: new Date(),
        created_by: token?.user_id || null
      }
    });
    return Response.json({ success: true, message: 'Lead Status created successfully', data: newlead_status });
  } catch (error) {
    console.error('Error creating lead_status:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);

    const req = await request.json();
    const id = req.slug;
    const updatedlead_status = await prisma.lead_status.update({
      where: { lead_status_id: id },
      data: {
        lead_status_name: req.lead_status_name,
        modified_at: new Date(),
        modified_by: token?.user_id || null
      }
    });
    return Response.json({ success: true, message: 'Lead Status updated successfully', data: updatedlead_status });
  } catch (error) {
    console.error('Error updating lead_status:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting lead_status with id:", id);
    const deletedlead_status = await prisma.lead_status.update({
      where: { lead_status_id: id },
      data: { flag: 1, modified_by: token?.user_id || null, modified_at: new Date() }
    });
    return Response.json({ success: true, message: 'Lead Status deleted successfully', data: deletedlead_status });
  } catch (error) {
    console.error('Error deleting lead_status:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";