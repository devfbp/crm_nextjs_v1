import AllEmployeeTableFilter from "@/component/filter/AllEmployeeTableFilter";
import Footer from "@/component/footer/Footer";
import AllEmployeeHeader from "@/component/header/AllEmployeeHeader";
import AllEmployeeTable from "@/component/tables/AllEmployeeTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - All Employee",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <AllEmployeeHeader />
            <div className="panel-body">
              <AllEmployeeTableFilter />
              <AllEmployeeTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
