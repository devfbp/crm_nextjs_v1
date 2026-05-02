import type { Metadata } from "next";
import React from "react";
import DueOverDueReportComponent from "../../../component/due_over_due/report";

const pageTitle = "Due Over Due Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function DueOverDueReport() {
  return (
    <DueOverDueReportComponent />
  );
}
