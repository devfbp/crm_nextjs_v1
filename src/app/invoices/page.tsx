import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import InvoiceSection from "@/component/invoice/InvoiceSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Invoices",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Invoices" />
      <InvoiceSection />

      <Footer />
    </main>
  );
}
