import PricingTableContent2 from "@/component/pricing-table/PricingTableContent2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Pricing Table 2",
  description: "",
};

export default function Home() {
  return <PricingTableContent2 />;
}
