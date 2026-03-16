"use client";
import React, { useCallback } from "react";
import BulkUpload from "@/component/lead-manage/BulkUpload";

export default function UploadXlsx() {

  return (
    <div className="card mb-20">
      <div className="card-header">
        Bulk Upload Leads
      </div>
      <div className="card-body p-5">
        <BulkUpload />
      </div>
    </div>
  );
}