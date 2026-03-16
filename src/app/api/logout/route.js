// app/api/logout/route.js
import { NextResponse } from 'next/server';
import Cookies from 'js-cookie';

export async function POST(request) {
  const res = NextResponse.json({ success: true });
  // expire the cookie
  res.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    expires: new Date(0),
  });
  res.cookies.set({
    name: '7hLIAH2Jk3hGd6s',
    value: '',
    path: '/',
    expires: new Date(0),
  });
  
  //Cookies.remove('7hLIAH2Jk3hGd6s', { path: '/' });
  
  return res;
}
