import ForgotPassword from "@/component/auth/ForgotPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Forgot Password Page",
  description: "",
};
export default function Home() {
  return <ForgotPassword />;
}
