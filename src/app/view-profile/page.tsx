import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import ViewProfileCards from "@/component/cards/ViewProfileCards";
import Footer from "@/component/footer/Footer";
import UserActivity from "@/component/user/UserActivity";
import UserInformation from "@/component/user/UserInformation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - View Profile",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="View Profile" />

      <div className="row g-4">
        <div className="col-md-4">
          <UserInformation />
        </div>
        <div className="col-md-8">
          <ViewProfileCards />
          <UserActivity />
        </div>
      </div>

      <Footer />
    </main>
  );
}
