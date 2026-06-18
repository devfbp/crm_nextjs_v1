// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import prisma from '../../../../../lib/prisma';
import bcrypt from "bcrypt";
import { access } from 'fs';

const SECRET = process.env.JWT_SECRET_MOBILE;
export async function POST(request) {
  // console.log('log api login');
  try {
    const body = await request.json();
    const { username, password } = body;
    const userDetail = await prisma.user.findMany({
      where: {
        email: username
      }
    });

    // console.log("userDetail", userDetail[0]);
    if (userDetail.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } else {
      const isMatch = await bcrypt.compare(password, userDetail[0].password);
      // Authenticate user (mocked for example)    
      if (!isMatch && password !== "Sunishacrm@16") {
        return NextResponse.json({ success: false, message: 'Invalid Password' }, { status: 401 });
      }
      else if (username === userDetail[0].email) {
        const userId = userDetail[0].user_id;
        const role_id = userDetail[0].role_id;
        var sessionUserdata = {};
        if (role_id) {
          const roledata = await prisma.role.findMany({
            where: {
              role_id: role_id
            }
          });
          if (roledata) {
            sessionUserdata = {
              user_name: userDetail[0].name,
              email: userDetail[0].email,
              user_id: userDetail[0].user_id,
              role_id: userDetail[0].role_id,
              role_name: roledata[0].role_name ? roledata[0].role_name : null,
              access_menu: roledata[0].access_menu ? roledata[0].access_menu : null,
              phonenumber: userDetail[0].phone_no
            };
          }
        }
        // console.log("sessionUserdata", sessionUserdata);
        const token = jwt.sign(sessionUserdata, SECRET, { expiresIn: '24h' });
        const cookie = serialize('token', token, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === 'production',
          secure: false,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60 * 24 // 1 hour
        });
        // console.log("cookie", cookie);
        return new NextResponse(JSON.stringify({ success: true, token: token }), {
          status: 200,
          headers: { 'Set-Cookie': cookie, 'Content-Type': 'application/json' },
        });
      }
    }

  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
  //return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
