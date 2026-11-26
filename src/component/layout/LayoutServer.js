import LayoutClient from "./LayoutClient";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Runs on the server for every page request, so keep it cheap.
// (It used to also Cryptr-encrypt the session: 100,000 synchronous PBKDF2
// rounds per request that blocked the whole Node server, for a value that
// LayoutClient never used.)
export default function LayoutServer({ children }) {
    let session = null;

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
            }

        } catch (error) {
            console.error("Invalid token:", error);
        }
    }

    return (
        <LayoutClient
            session={session}
            children={children}
        />
    );
}
