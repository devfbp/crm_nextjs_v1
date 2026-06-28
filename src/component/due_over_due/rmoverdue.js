"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import PaginationSection from "../PaginationSection";
import "../lead-manage/Leads.scss";
import { useState, useEffect, useMemo } from "react";
import Loader from "@/component/Loader";
export default function RmDue(props) {
  const filters = props.filters || {
    from_date: "",
    rm_user_id: "",
    to_date: "",
  };

  const [form, setForm] = useState({
    rm_user_id: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(500);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rmLeadArray, setRmLeadArray] = useState([]);
  // Apply Filters Locally
  const filteredData = useMemo(() => {
    return dataList.filter((d) => {
      const matchesSearch =
        !filters.search ||
        d.user_name?.toLowerCase().includes(filters.search.toLowerCase());

      const matchesUser =
        !filters.assigned_to ||
        d.rm_user_id?.toString() === filters.assigned_to;

      return matchesSearch && matchesUser;
    });
  }, [dataList, filters]);

  // Pagination Logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDataSlice = filteredData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch API
  const fetchData = async (filters) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/rm-overdue?`;
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
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN || ""
            }`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        // alert(JSON.stringify(result.data));
        setDataList(result.data || []);
        setRmLeadArray(result.rmLeadArray || []);
      } else {
        throw new Error(result.message || "Failed");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  const handleViewLeads = (rm_user_id) => {
    const leadIds = rmLeadArray[rm_user_id] || [];
    const leadIdsString = leadIds.join(',');
    localStorage.setItem("report_lead_ids", leadIdsString);
    localStorage.setItem("report_view", "1");
    const url = `/leads`;
    window.location.href = url;
  }

  return (
    <>
      <div className="card">
        {/* Filters */}

        {/* Table */}
        <div id="leadsDiv">
          <div className="table-wrapper">
            <table id="leadsTable" className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>RM Name</th>
                  <th>
                    <div className="text-right">
                      No of OverDue Leads
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" className="text-center">
                      <Loader />
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="2">
                      <Alert variant="danger">{error}</Alert>
                    </td>
                  </tr>
                ) : dataList.length > 0 ? (
                  dataList.map((item) => (
                    <tr key={item.rm_user_id}>
                      <td>{item.assigned_to || "N/A"}</td>
                      <td>
                        <div className="text-right pr-2">
                          <a  href="javascript:void(0)" onClick={() => handleViewLeads(item.rm_user_id)}>
                            {item._count?.lead_id || 0}
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No data available
                    </td>
                  </tr>
                )}
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
    </>
  );
}