"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import LeadStatusList from "../lead-manage/LeadStatusList";
import PaginationSection from "../PaginationSection";
import "../lead-manage/Leads.scss";
import { useState, useEffect } from "react";


export default function SvdReport(props) {
  const filters = props.filters || {
    from_date: "",
    rm_user_id: "",
    to_date: "",
  };
  const [dataPerPage, setDataPerPage] = useState(250);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/svd-lead-report?`;
      if (filters.from_date && filters.to_date) {
        url += `&from_date=${filters.from_date}`;
      }
      if (filters.to_date) {
        url += `&to_date=${filters.to_date}`;
      }
      if (filters.rm_user_id) {
        url += `&rm_user_id=${filters.rm_user_id}`;
        localStorage.setItem("lead_assigned_to", filters.assigned_to);
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
      {/* Table */}
      <div id="leadsDiv">
        <div className="table-wrapper">
          <table id="leadsTable" className="table table-hover table-striped">
            <thead>
              <tr>
                <th>
                  <div className="text-center">
                    Total SVD Leads
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="text-center">
                    {dataList.deadLeadsCount}
                  </div>
                </td>
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
    </>
  );
}
