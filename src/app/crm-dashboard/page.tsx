import BalanceOverview from "@/component/accounting/BalanceOverview";
import NoticeBoard from "@/component/announcement/NoticeBoard";
import DashboardBreadcrumb from "@/component/breadcrumb/DashboardBreadcrumb";
import CrmDashboardCards from "@/component/cards/CrmDashboardCards";
import Deadlines from "@/component/deadline/Deadlines";
import Footer from "@/component/footer/Footer";
import Invoices from "@/component/invoice/Invoices";
import AddNewTaskModal from "@/component/modal/AddNewTaskModal";
import RecentProjects from "@/component/project/RecentProjects";
import UpcomingProjects from "@/component/project/UpcomingProjects";
import MyTasks from "@/component/task/MyTasks";
import PendingWork from "@/component/task/PendingWork";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - CRM Dashboard",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb title="CRM Dashboard" />
      <CrmDashboardCards />
      <div className="row">
        <BalanceOverview />
        <RecentProjects />
        <UpcomingProjects />
        <PendingWork />
        <div className="col-xl-8 col-lg-7">
          <Invoices />
        </div>
        <MyTasks />
        <NoticeBoard />
        <Deadlines />
      </div>

      <Footer />
      <AddNewTaskModal />
    </main>
  );
}
