import CompanyFilter from "@/component/filter/CompanyFilter";
import Footer from "@/component/footer/Footer";
import CompanyHeader from "@/component/header/CompanyHeader";
import CompanyTable from "@/component/tables/CompanyTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Company",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <CompanyHeader />
            <div className="panel-body">
              <CompanyFilter />
              <CompanyTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
