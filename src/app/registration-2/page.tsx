import RegistrationContent2 from "@/component/auth/RegistrationContent2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Registration Page 2",
  description: "",
};
export default function Home() {
  return <RegistrationContent2 />;
}
