import AllProductTableFilter from "@/component/filter/AllProductTableFilter";
import Footer from "@/component/footer/Footer";
import AllProductHeader from "@/component/header/AllProductHeader";
import HeaderBtn from "@/component/header/HeaderBtn";
import AllProductTable from "@/component/tables/AllProductTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - All Product",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <div className="row g-4">
        <div className="col-12">
          <div className="panel">
            <AllProductHeader />
            <div className="panel-body">
              <HeaderBtn />
              <AllProductTableFilter />
              <AllProductTable />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
