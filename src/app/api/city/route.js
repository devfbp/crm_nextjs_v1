import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const city_id = parseInt(searchParams.get('city_id'));
    if (id) {
      const dataItem = await prisma.city.findUnique({
        where: { city_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (city_id) {
      where.city_id = city_id;
    }
    const dataItems = await prisma.city.findMany({
      where: where
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching citys:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  const token = getSessionFromToken(); 
  try {
    const req = await request.json();
    const newcity = await prisma.city.create({
      data: {
        city_name: req.city_name,
        state_id: parseInt(req.state_id),
        created_at: new Date(),
        created_by: token?.user_id || null
      }
    });
    return Response.json(newcity);
  } catch (error) {
    console.error('Error creating city:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    
    const req = await request.json();
    const id = req.slug;
    const updatedcity = await prisma.city.update({
      where: { city_id: id },
      data: {
        city_name: req.city_name,
        state_id: parseInt(req.state_id),
        modified_at: new Date(),
        modified_by: token?.user_id || null
      }
    });
    return Response.json(updatedcity);
  } catch (error) {
    console.error('Error updating city:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting city with id:", id);
    const deletedcity = await prisma.city.update({
      where: { city_id: id },
      data: { flag: 1, modified_by: token?.user_id || null, modified_at: new Date() }
    });
    return Response.json(deletedcity);
  } catch (error) {
    console.error('Error deleting city:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";