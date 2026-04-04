import prisma from '../../../../../lib/prisma';
import bcrypt from 'bcrypt';
import { getSessionFromToken } from "../../session";

export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const id = parseInt(req.id); // Ensure ID is a number
    const newhashedPassword = await bcrypt.hash(req.new_password, 12);
    // Fetch the user to verify the old password
    const user = await prisma.user.findUnique({
      where: { user_id: id},
    });
    const isMatch = await bcrypt.compare(req.old_password, user.password);
    if (!isMatch) {
      return Response.json({ success: false, message: "Invalid old password" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { user_id: id },
      data: {
        password: newhashedPassword,
        modified_at: new Date(),
        modified_by: token ? token.userId : null,
      },
    });

    return Response.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
