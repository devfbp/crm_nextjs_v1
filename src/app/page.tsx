import DashboardBreadcrumb from "@/component/breadcrumb/DashboardBreadcrumb";
import DashboardCards from "@/component/cards/DashboardCards";
import CrmDashboardCards from "@/component/cards/CrmDashboardCards";
import SalesAnalytics from "@/component/charts/SalesAnalytics";
import Board1 from "@/component/cards/Board_1";
import Pie1 from "@/component/cards/Pie_1";
import NewCustomer from "@/component/customer/NewCustomer";
import Footer from "@/component/footer/Footer";
import RecentOrder from "@/component/order/RecentOrder";
import SocialVisitors from "@/component/social/SocialVisitors";
import Chart_1 from "@/component/cards/Chart_1";
import ViewProfileCards from "@/component/cards/ViewProfileCards";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - eCommerce Dashboard",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb title="Dashboard" />
      <Board1 />
      {/* <CrmDashboardCards /> */}
      {/* <DashboardCards/> */}
      
      {/* <ViewProfileCards /> */}
      <div className="row">
        <Chart_1 />
      <Pie1 />
        {/* <SalesAnalytics />
        <SocialVisitors />
        <NewCustomer />
        <RecentOrder /> */}
      </div>
      <Footer />
    </main>
  );
}
