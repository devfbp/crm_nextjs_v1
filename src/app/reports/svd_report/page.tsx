import type { Metadata } from "next";
import React from "react";
import PageClient from "./page_client";

const pageTitle = "Dead Leads Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function DeadLeadsReport() {
  return (
    <>
      <PageClient />
    </>
  );
}
