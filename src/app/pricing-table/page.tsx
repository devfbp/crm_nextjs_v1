import PricingTableContent from "@/component/pricing-table/PricingTableContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Pricing Table",
  description: "",
};

export default function Home() {
  return <PricingTableContent />;
}
