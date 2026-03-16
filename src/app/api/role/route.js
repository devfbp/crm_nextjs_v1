import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const role_id = parseInt(searchParams.get('role_id'));
    if (id) {
      const dataItem = await prisma.role.findUnique({
        where: { role_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (role_id) {
      where.role_id = role_id;
    }
    const dataItems = await prisma.role.findMany({
      where: where
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching roles:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newRole = await prisma.role.create({
      data: {
        role_name: req.role_name,
        access_menu: req.access_menu,
        created_at: new Date(),
        created_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'Role created successfully', data: newRole });
  } catch (error) {
    console.error('Error creating role:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);    
    const req = await request.json();
    const id = req.slug; //parseInt(searchParams.get('id'));
    const updatedRole = await prisma.role.update({
      where: { role_id: id },
      data: {
        role_name: req.role_name,
        access_menu: req.access_menu,
        modified_at: new Date(),
        modified_by: token ? token.user_id : null
      }
    });
    return Response.json({ success: true, message: 'Role updated successfully', data: updatedRole });
  } catch (error) {
    console.error('Error updating role:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting role with id:", id);
    const deletedRole = await prisma.role.update({
      where: { role_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.user_id : null }
    });
    return Response.json({ success: true, message: 'Role deleted successfully', data: deletedRole });
  } catch (error) {
    console.error('Error deleting role:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";