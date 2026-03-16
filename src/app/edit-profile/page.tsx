import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import EditProfileSection from "@/component/profile/EditProfileSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Edit Profile",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Edit Profile" />
      <EditProfileSection />
      <Footer />
    </main>
  );
}
