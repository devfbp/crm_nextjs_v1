import NoticeBoard2 from "@/component/announcement/NoticeBoard2";
import DashboardBreadcrumb from "@/component/breadcrumb/DashboardBreadcrumb";
import HrmDashboardCards from "@/component/cards/HrmDashboardCards";
import AudienceOverview from "@/component/customer/AudienceOverview";
import Attendance from "@/component/employee/Attendance";
import UpcomingInterview from "@/component/employee/UpcomingInterview";
import Footer from "@/component/footer/Footer";
import RecentActivity from "@/component/task/RecentActivity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - HRM Dashboard",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb title="HR Dashboard" />
      <HrmDashboardCards />
      <div className="row">
        <AudienceOverview />
        <RecentActivity />
        <NoticeBoard2 />
        <Attendance />
        <UpcomingInterview />
      </div>

      <Footer />
    </main>
  );
}
