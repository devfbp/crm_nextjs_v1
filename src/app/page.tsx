"use client";
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
import React, { useEffect, useState, useMemo } from "react";

  // export const metadata: Metadata = {
  //   title: process.env.NEXT_PUBLIC_APP_NAME + " - eCommerce Dashboard",
  //   description: "",
  // };



export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <main className="main-content">      
      <>
        <div className="float-end">
          <input type="radio" name="active" value="0" id="active-0" checked={activeTab === 0} onChange={() => setActiveTab(0)} /> <label htmlFor="active-0">My Board</label>
          <input type="radio" name="active" value="1" className="ms-3" id="active-1" checked={activeTab === 1} onChange={() => setActiveTab(1)} /> <label htmlFor="active-1">Team Board</label>
        </div>
      </>
      <DashboardBreadcrumb title="Dashboard" />
      <Board1 activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* <CrmDashboardCards /> */}
      {/* <DashboardCards/> */}

      {/* <ViewProfileCards /> */}
      <div className="row">
        {/* <Chart_1 />
        <Pie1 /> */}
        {/* <SalesAnalytics />
        <SocialVisitors />
        <NewCustomer />
        <RecentOrder /> */}
      </div>
      <Footer />
    </main>
  );
}
