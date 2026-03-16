import AllCustomerTableFilter from "@/component/filter/AllCustomerTableFilter";
import Footer from "@/component/footer/Footer";
import AllCustomerHeader from "@/component/header/AllCustomerHeader";
import HeaderBtn from "@/component/header/HeaderBtn";
import AllCustomerTable from "@/component/tables/AllCustomerTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - All Customer",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <AllCustomerHeader />
            <div className="panel-body">
              <HeaderBtn />
              <AllCustomerTableFilter />
              <AllCustomerTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
