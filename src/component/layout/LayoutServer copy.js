import LayoutClient from "./LayoutClient";
import jwt from "jsonwebtoken";

import Cryptr from "cryptr";
import { cookies } from "next/headers";
export default function LayoutServer({ children }) {
    var session = null;
    var encryptedString = "";
    const cookieStore = cookies();
    // console.log("cookieStore",cookieStore);
    const token = cookieStore.get('token')?.value;
    // console.log("token in session", token);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (typeof decoded === 'string') {
                session = null;
            } else {
                session = decoded;
                const cryptr = new Cryptr(process.env.JWT_SECRET);
                encryptedString = cryptr.encrypt(session);
            }
        } catch (error) {
            console.error("Invalid token:", error);
            cookieStore.delete('token');
        }
    }
    return <LayoutClient session={session} children={children} encryptedString={encryptedString} />;
}