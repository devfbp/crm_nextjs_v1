"use client"
import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import Admin from "@/component/project-com/Admin";
import InputForm from "@/component/project-com/Form";
import { PROJECTS_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";

export default function Main(props: any) {
  const [records, setRecords] = useState<any>(null);
  const [viewAccess, setViewAccess] = useState(false);
  useEffect(() => {
    setViewAccess(accessMenuCheck(PROJECTS_MENU_ID, 1));
  }, []);
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title={`Manage ${props?.pageTitle}`} />
      <div className="row">
        {viewAccess &&
          <div className="col-lg-6">
            <Admin title={props?.pageTitle} setRecords={setRecords} />
          </div>
        }
        <div className="col-lg-6">
          <InputForm records={records} setRecords={setRecords} />
        </div>        
      </div>
      <Footer />
    </main>
  );
}
