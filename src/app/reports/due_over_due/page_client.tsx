"use client";
import type { Metadata } from "next";
import React from "react";
import RmDue from "../../../component/due_over_due/rmdue";
import RmwiseLeads from "../../../component/due_over_due/rmoverdue";
import DueOverDueReportComponent from "../../../component/due_over_due/report";
import UserList from "../../../component/lead-manage/UserList2";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";

const pageTitle = "Due Over Due Report";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function DueOverDueReportClient() {
  const [filters, setFilters] = useState({
    from_date: "",
    rm_user_id: "",
    to_date: "",
  });
  const [form, setForm] = useState({
    from_date: "",
    rm_user_id: "",
    to_date: "",
  });
  const refreshfilters = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
  return (
    <>
      <div className="col-12">
        <h2
          className="mb-3"
          style={{
            color: "#fff",
            fontSize: "1rem", textAlign: "center",
            textDecoration: "underline"
          }}
        >Due/Over Due Report</h2>
        <div className="card">
          {/* Filters */}
          <div className="card-body p-3">
            <div className="row g-2 align-items-center mb-2">
              <div className="col-md-4">
                <UserList form={form} setForm={setForm} doptionion="All" />
                <input type="hidden"
                  id="rm_user_id"
                  name="rm_user_id"
                  value={form.rm_user_id}
                />
              </div>
              <div className="col-md-2">
                <DatePicker
                  selected={form.from_date ? new Date(form.from_date) : null}
                  onChange={(date) =>
                    setForm({
                      ...form,
                      from_date: date ? date.toISOString() : "",
                    })
                  }
                  dateFormat="dd-MM-yyyy"
                  name="from_date"
                  id="from_date"
                  autoComplete="off"
                  placeholderText="From Date"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-md-2">
                <DatePicker
                  selected={form.to_date ? new Date(form.to_date) : null}
                  onChange={(date) =>
                    setForm({
                      ...form,
                      to_date: date ? date.toISOString() : "",
                    })
                  }
                  dateFormat="dd-MM-yyyy"
                  name="to_date"
                  id="to_date"
                  autoComplete="off"
                  placeholderText="To Date"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-md-2 d-flex gap-2">
                <button className="btn btn-sm btn-primary" onClick={() => setFilters(form)}>
                  Search
                </button>
                <button className="btn btn-sm btn-secondary" onClick={refreshfilters}>Reset</button>
              </div>
            </div>
          </div>
          <DueOverDueReportComponent filters={filters} />
        </div>
      </div >
      <div className="col-12">
        <div className="row">
          <div className="col-6">
            <RmDue filters={filters} />
          </div>
          <div className="col-6">
            <RmwiseLeads filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
}
