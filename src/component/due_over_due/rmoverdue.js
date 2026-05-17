"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import PaginationSection from "../PaginationSection";
import "../lead-manage/Leads.scss";
import { useState, useEffect, useMemo } from "react";

export default function RmDue() {
  const [filters, setFilters] = useState({
    dueDate: "",
    assigned_to: "",
    lead_status_id: "",
    search: "",
  });

  const [form, setForm] = useState({
    rm_user_id: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(500);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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


      if (filters.assigned_to) {
        url += `&assigned_to=${filters.assigned_to}`;
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
      } else {
        throw new Error(result.message || "Failed");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Apply filter when form changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      assigned_to: form.rm_user_id,
    }));
    setCurrentPage(1);
  }, [form.rm_user_id]);

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

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
                  <th className="text-center">
                    No of OverDue Leads
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="2" className="text-center">
                      <Spinner animation="border" />
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
                        <div style={{ textAlign: 'right', paddingRight: '10px' }}>
                          {item._count?.lead_id || 0}
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