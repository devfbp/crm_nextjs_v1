import type { Metadata } from "next";
import React from "react";
import RmDue from "../../../component/due_over_due/rmdue";
import RmwiseLeads from "../../../component/due_over_due/rmoverdue";


import DueOverDueReportComponent from "../../../component/due_over_due/report";

const pageTitle = "Due Over Due Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function DueOverDueReport() {
  return (
    <>
      <DueOverDueReportComponent />
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <RmDue />
          </div>
          <div className="col-6">
            <RmwiseLeads />
          </div>
        </div>
      </div>
    </>
  );
}
