"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export default function UploadXlsx() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;

    // ✅ Validate file
    if (!fileInput?.files?.length) {
      toast.error("Please select a file");
      return;
    }

    const file = fileInput.files[0];

    // ✅ Optional: validate file type
    if (!file.name.endsWith(".xlsx")) {
      toast.error("Only .xlsx files are allowed");
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    if (!API_URL) {
      toast.error("API URL not configured");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/lead-upload`, {
        method: "POST",
        body: formData,
      });

      const responseData = await res.json();

      if (res.ok) {
        
        console.log("Upload Response:", responseData);

        setData(responseData);
        if (responseData?.duplicate_leads?.length === 0 ) {
          if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_REFRESH_PAGE === "yes") {
            window.location.href = "/leads";
          }
        } else {
          toast.warn(responseData?.message || "File uploaded successfully");
        }

        // ✅ Reset form after success
        form.reset();
      } else {
        toast.error(responseData?.error || "Failed to upload file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      {/* Label */}
      <div className="col-4">
        <label htmlFor="file" className="form-label">
          Upload Excel File
        </label>
      </div>

      {/* Template download */}
      <div className="col-4">
        <a
          href="/assets/example-lead-format.xlsx"
          className="btn btn-secondary btn-sm float-end"
          download
        >
          Download Template
        </a>
      </div>

      {/* File input */}
      <div className="col-8">
        <input
          className="form-control"
          type="file"
          name="file"
          accept=".xlsx"
          required
        />
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="col-12">
          <Spinner animation="border" role="status" className="me-2">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="col-8">
          <button
            type="submit"
            className="btn btn-primary btn-sm float-end"
          >
            Upload
          </button>
        </div>
      )}

      {/* ✅ Duplicate Leads Section */}
      {data?.duplicate_leads?.length > 0 && (
        <div className="col-12">
          <p className="text-danger fw-bold">
            Number of duplicate leads found:{" "}
            {data.duplicate_leads.length}
          </p>

          <ul className="list-group">
            {data.duplicate_leads.map((lead: any, index: number) => (
              <li key={index} className="list-group-item text-danger">
                Row {lead.row} — {lead.customer_name} ({lead.mobile_no}) [
                {lead.project}]
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
}