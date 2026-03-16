import TableFilter from "@/component/filter/TableFilter";
import Footer from "@/component/footer/Footer";
import CustomerHeader from "@/component/header/CustomerHeader";
import CustomerTable from "@/component/tables/CustomerTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Customer",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <CustomerHeader />
            <div className="panel-body">
              <TableFilter />
              <CustomerTable />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
