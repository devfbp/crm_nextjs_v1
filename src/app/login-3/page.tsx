import LoginContent3 from "@/component/auth/LoginContent3";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Login Page 3",
  description: "",
};
export default function Home() {
  return <LoginContent3 />;
}
