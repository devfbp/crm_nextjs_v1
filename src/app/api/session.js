import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export function getSessionFromToken() {
  var token;
  try {
    const cookieStore = cookies();
    token = cookieStore.get('token')?.value;
    if (!token) {
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded session:", decoded);
    return typeof decoded === "string" ? null : decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    //console.log("Token provided:", token);
    return null;
  }
}