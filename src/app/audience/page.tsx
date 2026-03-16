import AudienceFilter from "@/component/filter/AudienceFilter";
import Footer from "@/component/footer/Footer";
import AudienceHeader from "@/component/header/AudienceHeader";
import AudienceTable from "@/component/tables/AudienceTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Audience",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <AudienceHeader />
            <div className="panel-body">
              <div className="table-filter-option">
                <AudienceFilter />
              </div>
              <AudienceTable />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
