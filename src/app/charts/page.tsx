import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import AllChartSection from "@/component/charts/AllChartSection";
import Footer from "@/component/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Charts Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Charts" />
      <AllChartSection />
      <Footer />
    </main>
  );
}
