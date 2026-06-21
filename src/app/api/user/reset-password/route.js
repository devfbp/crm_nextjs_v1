import prisma from "../../../../../lib/prisma";
import bcrypt from "bcrypt";
import { getSessionFromToken } from "../../session";

export async function POST(request) {
  try {
    const token = await getSessionFromToken();
    const req = await request.json();
    const id = parseInt(req.uid, 10);
    const email = req.email;
    const randpassword = Math.random().toString(36).slice(-8); // Generate a random password
    const newPassword = await bcrypt.hash(randpassword, 12);

    if (!id || !newPassword) {
      return Response.json(
        {
          success: false,
          message: "uid and new_password are required",
        },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });

    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: {
        password: newPassword,
        modified_at: new Date(),
        modified_by: token?.userId ?? null,
      },
    });

    // Send notification email
    if (email) {
      const html_body = `
        <h1>Password Reset</h1>
        <p>User password has been reset.</p>

        <table width="100%" border="1" cellpadding="8" cellspacing="0">
        <tr>
            <th>User ID</th>
            <td>${id}</td>
          </tr>
          <tr>
            <th>Email / Username</th>
            <td>${email}</td>
          </tr>
          <tr>
            <th>Password</th>
            <td style="color: #868686;">${randpassword}</td>
          </tr>
        </table>
      `;

      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/send-email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
              message: html_body,
              subject: `User Password Reset #${id}`,
            }),
          }
        );
      } catch (emailError) {
        console.error(
          "Error sending email notification:",
          emailError
        );
      }
    }

    const { password, ...userWithoutPassword } = updatedUser;

    return Response.json({
      success: true,
      message: "Password updated successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export const dynamic = "force-dynamic";