import prisma from '../../../../lib/prisma';
import bcrypt from 'bcrypt';
import { getSessionFromToken } from "../session";

const GM_ROLE_IDS = [2, 3, 4, 5, 6, 7, 8, 1];
const RM_ROLE_IDS = [2, 3, 4, 5];

export async function GET(request) {
  try {
    const token = getSessionFromToken();
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const gmid = parseInt(searchParams.get('gmid'));
    const rmid = parseInt(searchParams.get('rmid'));
    const cid = parseInt(searchParams.get('cid'));
    const search = searchParams.get('search');
    var limit = parseInt(searchParams.get('limit')) || 10000;
    var orderBy = searchParams.get('orderBy') || 'name';
    if (id) {
      const dataItem = await prisma.user.findUnique({
        where: { user_id: id },
      });
      return Response.json(dataItem);
    }

    // Build dynamic where clause
    let where = { flag: 0 };
    if (cid ) {
      where.user_id = { not: 2 };
    }
    if (gmid === 1) {
      where.role_id = { in: GM_ROLE_IDS };
    } else if (rmid === 1) {
      where.role_id = { in: RM_ROLE_IDS };
    } else {
      where.user_id = { gt: 1 };
    }
    if (search) {
      where.name = {
        contains: search.toString(),
      };
    }

    const dataItems = await prisma.user.findMany({ 
      where: where,
      take: limit,
      orderBy: {
        [orderBy]: 'asc'
      }
     });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching users:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const hashedPassword = await bcrypt.hash(req.password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: req.name,
        role_id: parseInt(req.role_id),
        email: req.email,
        phone_no: req.phone_no,
        password: hashedPassword,
        created_at: new Date(),
        reporting_to_id: parseInt(req.reporting_to_id),
        general_manager_id: parseInt(req.general_manager_id),
        created_by: token ? token.userId : null
      },
    });

    return Response.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const id = parseInt(req.slug); // Ensure ID is a number
    const hashedPassword = await bcrypt.hash(req.password, 12);

    const updatedUser = await prisma.user.update({
      where: { user_id: id },
      data: {
        name: req.name,
        role_id: parseInt(req.role_id),
        email: req.email,
        phone_no: req.phone_no,
        modified_at: new Date(),
        reporting_to_id: parseInt(req.reporting_to_id),
        general_manager_id: parseInt(req.general_manager_id),
        modified_by: token ? token.userId : null,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    const deletedUser = await prisma.user.update({
      where: { user_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.userId : null },
    });

    return Response.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
