"use client";
import { Alert, Spinner } from "react-bootstrap";
import UserList from "../lead-manage/UserList2";
import PaginationSection from "../PaginationSection";
import "../lead-manage/Leads.scss";
import { useState, useEffect, useMemo } from "react";

export default function LeadsCallingDoneDay() {
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
  const [dataPerPage, setDataPerPage] = useState(250);
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
      let url = `${process.env.NEXT_PUBLIC_API_URL}/reports/leads-called-day?`;


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
    <div className="col-12">
      <h2 className="mb-3 text-center text-white text-decoration-underline">
        No of Leads Called Today
      </h2>

      <div className="card">
        {/* Filters */}
        <div className="card-body p-3">
          <div className="row g-2 align-items-center">

            {/* User Filter */}
            <div className="col-md-3">
              <UserList form={form} setForm={setForm} doptionion="All" />
            </div>

            {/* Search */}
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search RM Name..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>

            {/* Per Page */}
            <div className="col-md-2 ms-auto">
              <select
                className="form-select"
                value={dataPerPage}
                onChange={(e) => {
                  setDataPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                {[10, 25, 50, 100, 250].map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
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
                  <th>RM Name</th>
                  <th className="text-center">
                    No of Leads Assigned Today
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
                      <td>{item.user_name || "N/A"}</td>
                      <td className="text-center">
                        {item._count?.lead_id || 0}
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
    </div>
  );
}