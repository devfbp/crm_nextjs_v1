import UpdatePasswordContent from "@/component/auth/UpdatePasswordContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Update Password Page",
  description: "",
};
export default function Home() {
  return <UpdatePasswordContent />;
}
