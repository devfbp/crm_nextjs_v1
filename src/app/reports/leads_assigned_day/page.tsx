import type { Metadata } from "next";
import React from "react";
import LeadsAssign from "../../../component/leads_assigned_day/report";

const pageTitle = "Leads Assigned Day Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function LeadsAssignedDay() {
  return (
    <LeadsAssign />
  );
}
