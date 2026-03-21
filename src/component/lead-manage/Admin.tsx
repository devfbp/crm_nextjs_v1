"use client";
import React, { useEffect, useState, useMemo } from "react";
import PaginationSection from "../PaginationSection";
import StatusName from "./StatusName";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import "./Leads.scss";
import Link from "next/link";
import { Spinner, Alert } from "react-bootstrap";
import { useDigiContext } from "@/context/DigiContext";
import { getUserSessionData } from "../utils/common";

const LeadsTable = (props: any) => {
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [navQuickToggleValue, setNavQuickToggleValue] = useState(props?.fullwidth);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const { navQuickToggle } = useDigiContext();

  const [sessionDataString, setSessionDataString] = useState<any>(null);

  useEffect(() => {
    if (navQuickToggleValue) {
      navQuickToggle();
      setNavQuickToggleValue(false);
    }
    const data = getUserSessionData();
    setSessionDataString(data);
  }, [navQuickToggle, navQuickToggleValue]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/lead?view=1");
      const result = await response.json();
      setDataList(result.map((r: any) => ({ ...r, selected: false })));
    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };
  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserFilter(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return dataList.filter((d) => {
      const matchesSearch =
        !searchTerm ||
        d.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.mobile_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.email_id?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || d.lead_status_id.toString() === statusFilter;
      const matchesUser = !userFilter || d.rm_user_id.toString() === userFilter;
      return matchesSearch && matchesStatus && matchesUser;
    });
  }, [dataList, searchTerm, statusFilter, userFilter]);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentDataSlice = filteredData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const sortColumn = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig) return currentDataSlice;
    return [...currentDataSlice].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [currentDataSlice, sortConfig]);

  const handleSelectAll = (checked: boolean) => {
    setDataList((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };
  const handleRowSelect = (id: number, checked: boolean) => {
    setDataList((prev) => prev.map((row) => (row.lead_id === id ? { ...row, selected: checked } : row)));
  };

  const uniqueStatuses = Array.from(new Set(dataList.map((d) => d.lead_status_id)));
  const uniqueUsers = Array.from(new Set(dataList.map((d) => d.rm_user_id)));

  return (
    <div className="col-12">
      <div className="card">
        {/* Filters */}
        <div className="card-body p-3">
          <div className="row g-2 align-items-center mb-2">
            <div className="col-md-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Leads..."
                className="form-control"
              />
            </div>
            {/* <div className="col-md-2">
              <select className="form-select" value={statusFilter} onChange={handleStatusChange}>
                <option value="">All Statuses</option>
                {uniqueStatuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select className="form-select" value={userFilter} onChange={handleUserChange}>
                <option value="">All Users</option>
                {uniqueUsers.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div> */}
            <div className="col-md-2">
              <input type="radio" name="quick_status" value="1" id="quick_status1" />
              <label htmlFor="quick_status1" className="ms-1">Due</label>
              <input type="radio" name="quick_status" value="0" className="ms-1" id="quick_status2" />
              <label htmlFor="quick_status2" className="ms-1">Over Due</label>
            </div>
            <div className="col-md-1 ms-auto">
              <select className="form-select" value={dataPerPage} onChange={(e) => setDataPerPage(Number(e.target.value))}>
                {[10, 25, 50, 100].map((count) => (
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
                  <th>
                    <input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} checked={dataList.every((row) => row.selected)} />
                  </th>
                  <th onClick={() => sortColumn("customer_name")}>Lead Name</th>
                  <th onClick={() => sortColumn("assigned_to")}>Assigned To</th>
                  <th onClick={() => sortColumn("contact_project")}>Contact-Project</th>
                  {sessionDataString?.role_id < 3 &&
                    <th onClick={() => sortColumn("sub_source_name")}>Source</th>
                  }
                  <th onClick={() => sortColumn("status")}>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && <tr><td colSpan={8} className="text-center"><Spinner animation="border" /></td></tr>}
                {error && <tr><td colSpan={8}><Alert variant="danger">{error}</Alert></td></tr>}
                {!loading && sortedData.length === 0 && <tr><td colSpan={8} className="text-center">No records found</td></tr>}
                {!loading && sortedData.map((data) => (
                  <tr key={data.lead_id}>
                    <td><input type="checkbox" checked={data.selected} onChange={(e) => handleRowSelect(data.lead_id, e.target.checked)} /></td>
                    <td>{data.customer_name}</td>
                    <td>{data.assigned_to}</td>
                    <td>{data.contact_project}</td>
                    {sessionDataString?.role_id < 3 &&
                      <td>{data.sub_source_name}</td>
                    }
                    <td>{data.status}</td>
                    <td>
                      <div className="btn-box">
                        <EditAction id={data.lead_id} page="leads" type="link" link={`/leads/${data.lead_id}/edit`} setRefresh="" menu_id={7} iconclass={false} />
                        {sessionDataString?.role_id < 3 &&
                          <Link title="History" className="btn btn-sm btn-icon btn-warning" href={`/leads/${data.lead_id}/history`}>
                            <i className="fa-light fa-history text-white"></i>
                          </Link>
                        }
                        <DeleteAction id={data.lead_id} page="lead" setRefresh="" menu_id={7} iconclass={false} reload={true} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
    </div >
  );
};

export default LeadsTable;