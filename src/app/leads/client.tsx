import TableFilter from "@/component/lead-manage/TableFilter";
import Footer from "@/component/footer/Footer";
import LeadsHeader from "@/component/lead-manage/LeadsHeader";
import AdminLead from "@/component/lead-manage/Admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Leads",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <LeadsHeader action={1} type={1} />
            <div className="panel-body p-0">
              {/* <div className="table-filter-option">
                <TableFilter />
              </div> */}
              <AdminLead fullwidth={true}/>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
