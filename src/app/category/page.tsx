import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import AddNewCategory from "@/component/category/AddNewCategory";
import AllCategory from "@/component/category/AllCategory";
import Footer from "@/component/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Category Page",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title={"Categories"} />
      <div className="row g-4">
        <AddNewCategory />
        <AllCategory />
      </div>

      <Footer />
    </main>
  );
}
