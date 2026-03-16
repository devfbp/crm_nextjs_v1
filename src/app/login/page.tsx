import LoginContent from "@/component/auth/LoginContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Login Page",
  description: "",
};
export default function Home() {
  return <LoginContent />;
}
