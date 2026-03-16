import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import NestableFolder from "@/component/sortable-list/NestableFolder";
import NestableTeam from "@/component/sortable-list/NestableTeam";
import NestedSortableHandle from "@/component/sortable-list/NestedSortableHandle";
import NestedSortableList from "@/component/sortable-list/NestedSortableList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - SweetAlert Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Nestable List" />
      <div className="row">
        <NestedSortableList />
        <NestedSortableHandle />
        <NestableFolder />
        <NestableTeam />
      </div>
      <Footer />
    </main>
  );
}
