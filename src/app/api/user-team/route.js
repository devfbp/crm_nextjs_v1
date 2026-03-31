import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

const GM_ROLE_IDS = [2, 3, 4, 5, 6, 7, 8, 1];
const RM_ROLE_IDS = [5, 6, 7, 8, 1];

export async function GET(request) {
  try {
    const token = getSessionFromToken();
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const user_team_id = parseInt(searchParams.get('user_team_id'));
    var limit = parseInt(searchParams.get('limit')) || 10000;
    var orderBy = searchParams.get('orderBy') || 'user_team_id';
    if (id) {
      const dataItem = await prisma.user_team.findUnique({
        where: { user_team_id: id },
      });
      return Response.json(dataItem);
    }
    if (user_team_id) {
      const datauserItems = await prisma.user_team_member.findMany({
        where: { user_team_id: user_team_id },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      });
      return Response.json(datauserItems);
    }
    // Build dynamic where clause
    let where = { flag: 0 };
    const dataItems = await prisma.user_team.findMany({
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
    const newUser = await prisma.user_team.create({
      data: {
        team_name: req.team_name,
        team_leader_id: parseInt(req.team_leader_id),
        created_at: new Date(),
        created_by: token ? token.userId : null
      },
    });

    if (newUser) {
      const member_id = req.members;
      if (member_id) {
        for (const id of member_id) {
          await prisma.user_team_member.create({
            data: {
              user_team_id: newUser.user_team_id,
              leader_id: parseInt(newUser.team_leader_id),
              member_id: parseInt(id),
              created_at: new Date(),
              created_by: token ? token.userId : null
            },
          });
        }
      }
    }

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
    const newUser = await prisma.user_team.update({
      where: { user_team_id: req.user_team_id },
      data: {
        team_name: req.team_name,
        team_leader_id: parseInt(req.team_leader_id),
        created_at: new Date(),
        created_by: token ? token.userId : null
      },
    });

    if (newUser) {
      const member_id = req.members;
      if (member_id) {
        await prisma.user_team_member.deleteMany({
          where: { user_team_id: newUser.user_team_id },
        });
        for (const id of member_id) {
          await prisma.user_team_member.create({
            data: {
              user_team_id: newUser.user_team_id,
              leader_id: parseInt(newUser.team_leader_id),
              member_id: parseInt(id),
              created_at: new Date(),
              created_by: token ? token.userId : null
            },
          });
        }
      }
    }

    return Response.json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

/*export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const id = parseInt(req.slug); // Ensure ID is a number
    const hashedPassword = await bcrypt.hash(req.password, 12);

    const updatedUser = await prisma.user_team.update({
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
*/
export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    const deletedUser = await prisma.user_team.update({
      where: { user_team_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token ? token.userId : null },
    });

    return Response.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
