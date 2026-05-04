import { NextResponse } from 'next/server';
import swaggerSpec from '../../../lib/swagger';

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not Found", { status: 404 });
  }
  return NextResponse.json(swaggerSpec);
}
