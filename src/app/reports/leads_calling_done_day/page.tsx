import type { Metadata } from "next";
import React from "react";
import LeadsCalling from "../../../component/leads_calling_done_day/report";

const pageTitle = "Leads Calling Done Day Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function LeadsCallingDoneDay() {
  return (
    <LeadsCalling />
  );
}
