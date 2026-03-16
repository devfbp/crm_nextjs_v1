import TaskTableFilter from "@/component/filter/TaskTableFilter";
import Footer from "@/component/footer/Footer";
import TaskHeader from "@/component/header/TaskHeader";
import AddNewTaskModal from "@/component/modal/AddNewTaskModal";
import EditTaskModal from "@/component/modal/EditTaskModal";
import ViewTaskModal from "@/component/modal/ViewTaskModal";
import TaskTable from "@/component/tables/TaskTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Task",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <TaskHeader />
            <div className="panel-body">
              <TaskTableFilter />
              <TaskTable />
            </div>
          </div>
        </div>
      </div>
      <AddNewTaskModal />
      <EditTaskModal />
      <ViewTaskModal />
      <Footer />
    </main>
  );
}
