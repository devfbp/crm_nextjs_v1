"use client";
import React, { useEffect, useState, useMemo } from "react";
import PaginationSection from "../PaginationSection";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import StatusName from "./StatusName";
import ProjectName from "./ProjectName";
import UserName from "./UserName";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import "./Leads.scss";
import Link from "next/link";
import { tr } from "date-fns/locale";
import { Table, Spinner, Alert } from "react-bootstrap";

const LeadsTable = () => {
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Common text search
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown filters
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  // Fetch data
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        await fetch(process.env.NEXT_PUBLIC_API_URL + "/send-email", {
          method: "POST",
          body: JSON.stringify({
            email: "nithy.snt@gmail.com",
            message: "Hello from Next.js"
          })
        });
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/lead");
        const result = await response.json();
        setDataList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle common search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle dropdown filters
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserFilter(e.target.value);
    setCurrentPage(1);
  };

  // Filtered Data
  const filteredData = useMemo(() => {
    return dataList.filter((data) => {
      const matchesSearch =
        !searchTerm ||
        data.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(data.created_at)
          .toLocaleDateString(process.env.NEXT_PUBLIC_DATE_FORMAT)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        !statusFilter || data.lead_status_id.toString() === statusFilter;

      const matchesUser =
        !userFilter || data.rm_user_id.toString() === userFilter;

      return matchesSearch && matchesStatus && matchesUser;
    });
  }, [dataList, searchTerm, statusFilter, userFilter]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Unique statuses and users for dropdown
  const uniqueStatuses = Array.from(
    new Set(dataList.map((d) => d.lead_status_id))
  );
  const uniqueUsers = Array.from(
    new Set(dataList.map((d) => d.rm_user_id))
  );

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body p-3">

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Leads (Name, Phone, Email, Date)..."
            className="form-control mb-2"
          />
        </div>

        <OverlayScrollbarsComponent>
          <table
            className="table table-dashed table-hover digi-dataTable leads-table table-striped"
            id="leadsTable"
          >
            <thead>
              <tr>
                <th>Action</th>

                <th>Name</th>
                <th>Phone No</th>
                <th>
                  {/* Status Dropdown */}
                  <select
                    value={statusFilter}
                    onChange={handleStatusChange}
                    className="form-control form-control-sm"
                  >
                    <option value="">All Status</option>
                    {uniqueStatuses.map((statusId) => (
                      <option key={statusId} value={statusId}>
                        <StatusName status_id={statusId} />
                      </option>
                    ))}
                  </select>
                </th>
                <th>Email Id</th>
                <th>Project</th>
                <th>
                  {/* User Dropdown */}
                  <select
                    value={userFilter}
                    onChange={handleUserChange}
                    className="form-control form-control-sm"
                  >
                    <option value="">All Users</option>
                    {uniqueUsers.map((userId) => (
                      <option key={userId} value={userId}>
                        <UserName user_id={userId} />
                      </option>
                    ))}
                  </select>
                </th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading */}
              {loading && (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              )}
              {/* Error */}
              {error && <Alert variant="danger">{error}</Alert>}
              {currentData.length > 0 ? (
                currentData.map((data) => (
                  <tr key={data.lead_id}>
                    <td>
                      <div className="btn-box">
                        <EditAction
                          id={data.lead_id}
                          page="leads"
                          type="link"
                          link={`/leads/${data.lead_id}/edit`}
                          setRefresh={""}
                          menu_id={7}
                          iconclass={true}
                        />
                        <Link
                          title="History"
                          className="btn btn-sm btn-icon"
                          href={`/leads/${data.lead_id}/history`}
                        >
                          <i className="fa-light fa-history text-warning"></i>
                        </Link>
                        <DeleteAction
                          id={data.lead_id}
                          page="lead"
                          setRefresh={""}
                          menu_id={7}
                          iconclass={true}
                          reload={true}
                        />
                      </div>
                    </td>

                    <td className="p-5">{data.customer_name}</td>
                    <td>{data.mobile_no}</td>
                    <td>
                      <StatusName status_id={data.lead_status_id} />
                    </td>
                    <td>{data.email_id}</td>
                    <td>
                      <ProjectName project_id={data.project_id} />
                    </td>
                    <td>
                      <UserName user_id={data.rm_user_id} />
                    </td>
                    <td>
                      {new Date(data.created_at).toLocaleDateString(
                        process.env.NEXT_PUBLIC_DATE_FORMAT
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </OverlayScrollbarsComponent>

        {/* Pagination */}
        <PaginationSection
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          dataList={filteredData}
        />
      </div>
    </div>
  );
};

export default LeadsTable;