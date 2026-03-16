import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import BorderColorTableSection from "@/component/tables/BorderColorTableSection";
import BorderedTableSection from "@/component/tables/BorderedTableSection";
import BorderlessTableSection from "@/component/tables/BorderlessTableSection";
import ColorTableSection from "@/component/tables/ColorTableSection";
import CustomizedDataTableSection from "@/component/tables/CustomizedDataTableSection";
import DefaultDataTableSection from "@/component/tables/DefaultDataTableSection";
import DefaultTableSection from "@/component/tables/DefaultTableSection";
import HoverableTableSection from "@/component/tables/HoverableTableSection";
import ScrollDataTableSection from "@/component/tables/ScrollDataTableSection";
import StripeColumnTableSection from "@/component/tables/StripeColumnTableSection";
import StripeRowTableSection from "@/component/tables/StripeRowTableSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Tables Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Tables" />
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <div className="panel-header">
              <h5>Basic Tables</h5>
            </div>
            <div className="panel-body">
              <div className="row g-3">
                <DefaultTableSection />
                <StripeRowTableSection />
                <StripeColumnTableSection />
                <ColorTableSection />
                <HoverableTableSection />
                <BorderedTableSection />
                <BorderColorTableSection />
                <BorderlessTableSection />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="panel">
            <div className="panel-header">
              <h5>Data Tables</h5>
            </div>
            <div className="panel-body">
              <div className="row g-3">
                <DefaultDataTableSection />
                <ScrollDataTableSection />
                <CustomizedDataTableSection />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
