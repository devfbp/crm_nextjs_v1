import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const state_id = parseInt(searchParams.get('state_id'));
    if (id) {
      const dataItem = await prisma.state.findUnique({
        where: { state_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (state_id) {
      where.state_id = state_id;
    }
    const dataItems = await prisma.state.findMany({
      where: where
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching states:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newstate = await prisma.state.create({
      data: {
        state_name: req.state_name,
        created_at: new Date(),
        created_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'State created successfully', data: newstate });
  } catch (error) {
    console.error('Error creating state:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);

    const req = await request.json();
    const id = req.slug;
    const updatedstate = await prisma.state.update({
      where: { state_id: id },
      data: {
        state_name: req.state_name,
        modified_at: new Date(),
        modified_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'State updated successfully', data: updatedstate });
  } catch (error) {
    console.error('Error updating state:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting state with id:", id);
    const deletedstate = await prisma.state.update({
      where: { state_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.user_id : null }
    });
    return Response.json({ success: true, message: 'State deleted successfully', data: deletedstate });
  } catch (error) {
    console.error('Error deleting state:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";