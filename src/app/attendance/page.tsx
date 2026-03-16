import AttendanceTableFilter from "@/component/filter/AttendanceTableFilter";
import Footer from "@/component/footer/Footer";
import AttendanceHeader from "@/component/header/AttendanceHeader";
import AttendanceTable from "@/component/tables/AttendanceTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Attendance",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <AttendanceHeader />
            <div className="panel-body">
              <AttendanceTableFilter />
              <AttendanceTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
