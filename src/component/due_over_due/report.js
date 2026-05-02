"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import LeadStatusList from "../lead-manage/LeadStatusList";
import PaginationSection from "../PaginationSection";
import { useState } from "react";


export default function DueOverDueReportComponent() {
  const [filters, setFilters] = useState({
    dueDate: "",
    rm_user_id: "",
    lead_status_id: "",
  });
  const [form, setForm] = useState({
    rm_user_id: "",
    lead_status_id: "",
  });
  const [dataPerPage, setDataPerPage] = useState(250);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/due-overdue?`;
      if (filters.dueDate) {
        url += `&due_filter=${filters.dueDate}`;
        localStorage.setItem("lead_due_filter", filters.dueDate);
      }
      if (filters.assigned_to) {
        url += `&assigned_to=${filters.assigned_to}`;
        localStorage.setItem("lead_assigned_to", filters.assigned_to);
      }
      if (filters.lead_status_id && filters.lead_status_id !== 0) {
        url += `&lead_status_id=${filters.lead_status_id}`;
        localStorage.setItem("lead_status_id", filters.lead_status_id);
      }
      // alert(url);
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "bearer": process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
          },
        }
      );
      const result = await response.json();
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
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
              <div className="col-md-1">
                <select
                  className="form-select"
                  value={filters.dueDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ ...filters, dueDate: value });
                    fetchData({ ...filters, dueDate: value });
                  }}>
                  <option value="">All</option>
                  <option value="1">Due</option>
                  <option value="0">Over Due</option>
                  <option value="2">Upcoming</option>
                </select>
              </div>
              <div className="col-md-2">
                <UserList form={form} setForm={setForm} doptionion="All" />
                <input type="hidden"
                  id="rm_user_id"
                  name="rm_user_id"
                  value={form.rm_user_id}
                />
              </div>
              <div className="col-md-2">
                <select
                  id="lead_status_id"
                  name="lead_status_id"
                  className="form-select border-white"
                  value={filters.lead_status_id}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ ...filters, lead_status_id: value });
                    fetchData({ ...filters, lead_status_id: value });
                  }}
                >
                  <LeadStatusList
                    name="lead_status_id"
                    selected_options={form.lead_status_id}
                    doptionion="All"
                  />
                </select>
              </div>
              <div className="col-md-1">
                {/* <button className="btn btn-sm btn-secondary" onClick={refreshfilters}>Reset</button> */}
              </div>
              <div className="col-md-1 ms-auto">
                <select className="form-select" value={dataPerPage} onChange={(e) => setDataPerPage(Number(e.target.value))}>
                  {[10, 25, 50, 100, 250, 500].map((count) => (
                    <option key={count} value={count}>{count}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div id="leadsDiv">
            <div className="table-wrapper">
              <table id="leadsTable" className="table table-hover table-striped">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}
          {/* <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            pageNumbers={pageNumbers}
            indexOfFirstData={indexOfFirstData}
            indexOfLastData={indexOfLastData}
            dataList={filteredData}
          /> */}
        </div>
      </div >
    </>
  );
}
