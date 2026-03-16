import ComingSoonContent2 from "@/component/upcoming/ComingSoonContent2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Coming Soon 2",
  description: "",
};

export default function Home() {
  return <ComingSoonContent2 />;
}
