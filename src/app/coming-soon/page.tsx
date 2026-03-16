import ComingSoonContent from "@/component/upcoming/ComingSoonContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Coming Soon",
  description: "",
};

export default function Home() {
  return <ComingSoonContent />;
}
