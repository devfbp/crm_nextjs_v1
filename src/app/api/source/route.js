import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const source_id = parseInt(searchParams.get('source_id'));
    const search = searchParams.get('search');
    var limit = parseInt(searchParams.get('limit')) || 10000;
    var orderBy = searchParams.get('orderBy') || 'source_name';
    if (id) {
      const dataItem = await prisma.source.findUnique({
        where: { source_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (source_id) {
      where.source_id = source_id;
    }
    if (search) {
      where.source_name = {
        contains: search.toString(),
      };
    }
    const dataItems = await prisma.source.findMany({
      where: where,
      take: limit,
      orderBy: {
        [orderBy]: 'asc'
      }
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching sources:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newsource = await prisma.source.create({
      data: {
        source_name: req.source_name,
        created_at: new Date(),
        created_by: token ? token.userId : null
      }
    });
    return Response.json({ success: true, message: 'source created successfully', data: newsource });
  } catch (error) {
    console.error('Error creating source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);    
    const req = await request.json();
    const id = req.slug; //parseInt(searchParams.get('id'));
    const updatedsource = await prisma.source.update({
      where: { source_id: id },
      data: {
        source_name: req.source_name,
        modified_at: new Date(),
        modified_by: token ? token.userId : null
      }
    });
    return Response.json({ success: true, message: 'source updated successfully', data: updatedsource });
  } catch (error) {
    console.error('Error updating source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting source with id:", id);
    const deletedsource = await prisma.source.update({
      where: { source_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.userId : null }
    });
    return Response.json({ success: true, message: 'source deleted successfully', data: deletedsource });
  } catch (error) {
    console.error('Error deleting source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";