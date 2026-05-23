import LayoutClient from "./LayoutClient";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import { cookies } from "next/headers";

export default function LayoutServer({ children }) {
    let session = null;
    let encryptedString = "";

    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            if (typeof decoded !== 'string') {
                session = decoded;

                const cryptr = new Cryptr(
                    process.env.JWT_SECRET
                );

                encryptedString = cryptr.encrypt(
                    JSON.stringify(session)
                );
            }

        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    return (
        <LayoutClient
            session={session}
            children={children}
            encryptedString={encryptedString}
        />
    );
}