// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from '../../../../lib/prisma';
import bcrypt from "bcrypt";
import { access } from 'fs';

const SECRET = process.env.JWT_SECRET;
export async function POST(request) {
  // console.log('log api login');
  try {
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcrypt.hash(randomString, 16);
    const body = await request.json();
    const { email } = body;
    const checkUser = await prisma.user.findUnique({
      where: {
        email: email
      }    
    });
    if (!checkUser) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    const userDetail = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        password: hashedPassword
      }
    });
    if (userDetail) {
      let html_body = `<h1>Reset Password</h1>
      <p>Your password has been reset successfully.</p>

      <!-- Table -->
      <table class="content-table">
        <tr>
          <th>Password</th>
        </tr>
        <tr>
          <td>` + randomString + `</td>
        </tr>
      </table>
      <p>We recommend changing this temporary password after logging in for security reasons.</p>
      <p>Thank you for being part of our community!</p>`

      try {
        const mail_response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email || process.env.NEXT_PUBLIC_ADMIN_EMAIL,
            message: html_body,
            subject: "Password Reset"
          })
        });
        // console.log("Email notification response:", mail_response);
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        return NextResponse.json({ success: false, message: 'Password reset but failed to send email notification.' }, { status: 500 });
      }
    }

  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: 'Password reset successfully. Please check your email for the new password.' });
}
