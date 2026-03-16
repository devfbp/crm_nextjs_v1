import LoginStatusContent from "@/component/auth/LoginStatusContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Login Status Page",
  description: "",
};
export default function Home() {
  return <LoginStatusContent />;
}
