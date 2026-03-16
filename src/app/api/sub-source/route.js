import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const source_id = parseInt(searchParams.get('source_id'));
    const sub_source_id = parseInt(searchParams.get('sub_source_id'));
    const search = searchParams.get('search');
    var limit = parseInt(searchParams.get('limit')) || 10000;
    var orderBy = searchParams.get('orderBy') || 'sub_source_name';
    if (id) {
      const dataItem = await prisma.sub_source.findUnique({
        where: { sub_source_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (source_id) {
      where.source_id = source_id;
    }
    if (sub_source_id) {
      where.sub_source_id = sub_source_id;
    }
    if (search) {
      where.sub_source_name = {
        contains: search.toString(),
      };
    }
    const dataItems = await prisma.sub_source.findMany({
      where: where,
      take: limit,
      orderBy: {
        [orderBy]: 'asc'
      }
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching sub_sources:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newsub_source = await prisma.sub_source.create({
      data: {
        sub_source_name: req.sub_source_name,
        source_id: req.source_id,
        created_at: new Date(),
        created_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'sub_source created successfully', data: newsub_source });
  } catch (error) {
    console.error('Error creating sub_source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const req = await request.json();
    const id = req.slug; //parseInt(searchParams.get('id'));
    const updatedsub_source = await prisma.sub_source.update({
      where: { sub_source_id: id },
      data: {
        sub_source_name: req.sub_source_name,
        source_id: req.source_id,
        modified_at: new Date(),
        modified_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'sub_source updated successfully', data: updatedsub_source });
  } catch (error) {
    console.error('Error updating sub_source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting sub_source with id:", id);
    const deletedsub_source = await prisma.sub_source.update({
      where: { sub_source_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.user_id : null }
    });
    return Response.json({ success: true, message: 'sub_source deleted successfully', data: deletedsub_source });
  } catch (error) {
    console.error('Error deleting sub_source:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";