import type { Metadata } from "next";
import React from "react";
import RmDeadLeads from "../../../component/dead_leads_report/rm_deadleads";
import DeadLeadsReportComponent from "../../../component/dead_leads_report/report";

const pageTitle = "Dead Leads Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function DeadLeadsReport() {
  return (
    <>
      <DeadLeadsReportComponent />
      <RmDeadLeads />
    </>
  );
}
