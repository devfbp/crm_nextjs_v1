"use client";
import React, { useEffect, useState, useMemo } from "react";
import PaginationSection from "../PaginationSection";
import { toast } from "react-toastify";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import Link from "next/link";
import { Spinner, Alert } from "react-bootstrap";
import { useDigiContext } from "@/context/DigiContext";
import { accessMenuRole } from "../utils/common";
import BulkUpdateModal from "./BulkUpdate";
import LeadHistory from "./LeadHistory";
import { accessMenuCheck } from "@/component/utils/common";
import "./Leads.scss";
import UserList from "./UserList2";
import LeadStatusList from "./LeadStatusList";
import { rm } from "fs";
import { set } from "date-fns";

const LeadsTable = (props: any) => {
  const [form, setForm] = useState({
    rm_user_id: "",
    lead_status_id: ""
  });
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showLeadHistory, setShowLeadHistory] = useState(false);
  const [bulkStatus, setBulkStatus] = useState([{ lead_status_id: "", rm_user_id: "", remarks: "" }]);
  const [navQuickToggleValue, setNavQuickToggleValue] = useState(props?.fullwidth);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);


  const [editAccess, setEditAccess] = useState(false);
  const [historyLead, setHistoryLead] = useState<any | null>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    user: "",
    dueDate: "",
    assigned_to: "",
  });

  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const { navQuickToggle } = useDigiContext();

  useEffect(() => {
    // if (navQuickToggleValue) {
    //   navQuickToggle();
    //   setNavQuickToggleValue(false);
    // }
    setEditAccess(accessMenuCheck(7, 3));
  }, [navQuickToggle, navQuickToggleValue]);

  const fetchData = async (filters: any) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}lead?view=1`;
      if (filters.dueDate) {
        url += `&due_filter=${filters.dueDate}`;
      }
      if (filters.assigned_to) {
        url += `&assigned_to=${filters.assigned_to}`;
      }
      if (filters.lead_status_id && filters.lead_status_id !== 0) {
        url += `&lead_status_id=${filters.lead_status_id}`;
      }
      // alert(url);
      const response = await fetch(url);
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
    fetchData(filters);
  }, [filters]);

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

  const handleBulkUpdate = async (value:any) => {
    const selectedLeads = dataList.filter((d) => d.selected);

    if (selectedLeads.length === 0) {
      toast.warning("Please select at least one lead for bulk update");
      return;
    }

    if (value === 1) {
      setSelectedLeads(selectedLeads);
      setShowBulkModal(true);
    } else if (value === 2) {
      if (confirm("Are you sure you want to delete the selected leads?")) {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/lead/bulk-update",
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                lead_ids: selectedLeads,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete leads");
          }

          toast.success("Leads deleted successfully");
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        } finally {
          setTimeout(() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }, 1000);
        }
      }
    }
  };

  const handleLeadHistory = (data: any) => {
    setHistoryLead(data);
    setShowLeadHistory(true);
  };

  useEffect(() => {
    // if (!form.rm_user_id) return;

    const updatedFilters = {
      ...filters,
      assigned_to: form.rm_user_id,
    };

    setFilters(updatedFilters);
    fetchData(updatedFilters);
  }, [form.rm_user_id]);
  useEffect(() => {
    // if (!form.rm_user_id) return;

    const updatedFilters = {
      ...filters,
      lead_status_id: form.lead_status_id,
    };

    setFilters(updatedFilters);
    fetchData(updatedFilters);
  }, [form.lead_status_id]);
  const refreshfilters = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
  return (
    <React.Fragment>
      <div className="col-12">
        <div className="card">
          {/* Filters */}
          <div className="card-body p-3">
            <div className="row g-2 align-items-center mb-2">
              <div className="col-md-3">
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
              <div className="col-md-1">
                <select className="form-select" value={filters.dueDate} onChange={(e) => { const value = e.target.value; setFilters({ ...filters, dueDate: value }); fetchData({ ...filters, dueDate: value }); }}>
                  <option value="">All</option>
                  <option value="1">Due</option>
                  <option value="0">Over Due</option>
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
                  value={form.lead_status_id}
                  onChange={(e) =>
                    setForm({ ...form, lead_status_id: e.target.value })
                  }
                >
                  <LeadStatusList
                    name="lead_status_id"
                    selected_options={form.lead_status_id}
                    doptionion="All"
                  />
                </select>
              </div>
              <div className="col-md-1">
                <button className="btn btn-sm btn-secondary" onClick={refreshfilters}>Reset</button>
              </div>
              {editAccess &&
                <div className="col-md-2">
                  <select
                    id="lead_status_id"
                    name="lead_status_id"
                    className="form-select border-white"
                    value={form.lead_status_id}
                    onChange={(e) => handleBulkUpdate(Number(e.target.value))}
                  >
                    <option value="">--Bulk Action--</option>
                    <option value="1">Bulk Update</option>
                    <option value="2">Bulk Delete</option>
                  </select>
                </div>
              }
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
                    {accessMenuRole(1) &&
                      <th>
                        <input type="hidden" onChange={(e) => handleSelectAll(e.target.checked)} checked={dataList.every((row) => row.selected)} />
                      </th>
                    }
                    <th onClick={() => sortColumn("customer_name")}>Lead Name</th>
                    <th onClick={() => sortColumn("mobile_no")}>Contact</th>
                    <th onClick={() => sortColumn("project_name")}>Project</th>
                    <th onClick={() => sortColumn("assigned_to")}>Assigned To</th>
                    {accessMenuRole(1) &&
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
                      {accessMenuRole(1) &&
                        <td><input type="checkbox" checked={data.selected} onChange={(e) => handleRowSelect(data.lead_id, e.target.checked)} /></td>
                      }
                      
                      <td title={data.customer_name}>
                        {data.customer_name.length > 15 ? data.customer_name.substr(0, 15) + '...' : data.customer_name}
                      </td>
                      <td>{data.mobile_no}</td>
                      <td title={data.project_name}>
                        {data.project_name.length > 25 ? data.project_name.substr(0, 20) + '...' : data.project_name}
                      </td>
                      <td>{data.assigned_to}</td>
                      {accessMenuRole(1) &&
                        <td>{data.sub_source_name}</td>
                      }
                      <td>{data.status}</td>
                      <td>
                        <div className="btn-box">
                          <EditAction id={data.lead_id} page="leads" type="link" link={`/leads/${data.lead_id}/edit`} setRefresh="" menu_id={7} iconclass={false} />
                          {accessMenuRole(2) &&
                            <Link
                              title="History"
                              className="btn btn-sm btn-icon btn-warning"
                              href="javascript:void(0)"
                              onClick={(e) => {
                                e.preventDefault();
                                handleLeadHistory(data); // pass the specific data item here
                              }}
                            >
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
      <BulkUpdateModal
        show={showBulkModal}
        selectedLeads={selectedLeads}
        lead_id=""
        handleClose={() => setShowBulkModal(false)}
      />
      <LeadHistory
        show={showLeadHistory}
        handleClose={() => setShowLeadHistory(false)}
        slug={historyLead}
      />
    </React.Fragment>
  );
};

export default LeadsTable;