import RegistrationContent from "@/component/auth/RegistrationContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Registration Page",
  description: "",
};
export default function Home() {
  return <RegistrationContent />;
}
