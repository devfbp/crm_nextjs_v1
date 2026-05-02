"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import LeadStatusList from "../lead-manage/LeadStatusList";
import PaginationSection from "../PaginationSection";
import "../lead-manage/Leads.scss";
import { useState, useEffect } from "react";


export default function DeadLeadsReportComponent() {
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
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/dead-lead-report?`;
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
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN || ""}`,
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setDataList(result.data || []);
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filters);
  }, [filters]);
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
        >
          Dead Leads Report
        </h2>
        <div className="card">
          {/* Filters */}
          <div className="card-body p-3">
            <div className="row g-2 align-items-center mb-2">            
              
              
            </div>
          </div>

          {/* Table */}
          <div id="leadsDiv">
            <div className="table-wrapper">
              <table id="leadsTable" className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>Dead Leads</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{dataList.deadLeadsCount}</td>
                  </tr>
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
