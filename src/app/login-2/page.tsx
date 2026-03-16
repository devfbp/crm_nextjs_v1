import LoginContent2 from "@/component/auth/LoginContent2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Login Page 2",
  description: "",
};
export default function Home() {
  return <LoginContent2 />;
}
