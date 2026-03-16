import ResetPasswordContent from "@/component/auth/ResetPasswordContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Reset Password Page",
  description: "",
};
export default function Home() {
  return <ResetPasswordContent />;
}
