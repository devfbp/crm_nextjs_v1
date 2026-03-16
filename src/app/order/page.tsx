import OrderTableFilter from "@/component/filter/OrderTableFilter";
import Footer from "@/component/footer/Footer";
import HeaderBtn from "@/component/header/HeaderBtn";
import OrderHeader from "@/component/header/OrderHeader";
import OrderListTable from "@/component/tables/OrderListTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Order",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row g-4">
        <div className="col-12">
          <div className="panel">
            <OrderHeader />
            <div className="panel-body">
              <HeaderBtn />
              <OrderTableFilter />
              <OrderListTable />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
