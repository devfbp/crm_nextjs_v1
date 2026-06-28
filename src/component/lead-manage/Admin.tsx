"use client";
import React, { useEffect, useState, useMemo } from "react";
import PaginationSection from "../PaginationSectionMain";
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
import HistoryCount from "./HistoryCount";
import Loader from "../Loader";
import { showDateNa } from "../utils/common-client";

const LeadsTable = (props: any) => {
  const [form, setForm] = useState({
    rm_user_id: "",
    lead_status_id: "",
    suserer_id: "",
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    user: "",
    dueDate: "",
    assigned_to: "",
    lead_status_id: "",
  });
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(100);
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
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
  const { navQuickToggle } = useDigiContext();
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSizeOptions = [10, 50, 100, 250, 500, 1000];

  useEffect(() => {
    setEditAccess(accessMenuCheck(7, 3));
  }, [navQuickToggle, navQuickToggleValue]);

  const fetchData = async (filters: any, pageNumber: number, dataPerPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}lead/view`;

      localStorage.setItem("lead_page", pageNumber.toString());
      localStorage.setItem("lead_limit", dataPerPage.toString());

      const body: any = {
        page: pageNumber,
        limit: dataPerPage,
        view: 1,
      };

      if (filters.dueDate) {
        body.due_filter = filters.dueDate;
        localStorage.setItem("lead_due_filter", filters.dueDate);
      }

      if (filters.search) {
        body.search = filters.search;
        localStorage.setItem("lead_search", filters.search);
      } else if (searchTerm) {
        body.search = searchTerm;
        localStorage.setItem("lead_search", searchTerm);
      }

      if (filters.assigned_to) {
        body.assigned_to = filters.assigned_to;
        localStorage.setItem("lead_assigned_to", filters.assigned_to);
      }

      if (filters.lead_status_id && filters.lead_status_id > 0) {
        body.lead_status_id = filters.lead_status_id;
        localStorage.setItem("lead_status_id", filters.lead_status_id.toString());
      }

      if (localStorage.getItem("dd_callsDoneToday") === "true") {
        body.dd_callsDoneToday = true;
      }

      if (localStorage.getItem("dd_totalLeadsToday") === "true") {
        body.dd_totalLeadsToday = true;
      }

      if (localStorage.getItem("dd_svd") === "true") {
        body.dd_svd = true;
      }

      if (localStorage.getItem("dd_closure") === "true") {
        body.dd_closure = true;
      }

      if (localStorage.getItem("report_view") === "1") {
        const lead_ids = localStorage.getItem("report_lead_ids");
        if (lead_ids) {
          body.report = 1;
          body.lead_ids = lead_ids;
        }
      }

      if (loading) return;
      console.log("Fetching data with filters:", url, "-", body);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      const loaddata = result.data || result;

      setDataList(loaddata.map((r: any) => ({ ...r, selected: false })));
      setTotalRecords(result.total);

    } catch (error) {
      console.error(error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    fetchData({ ...filters, search: e.target.value }, currentPage, dataPerPage);
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

  const totalPages = Math.ceil(totalRecords / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchData(filters, pageNumber, dataPerPage);
  };

  const sortColumn = (key: string) => {
    console.log("Sorting by:", key);
  };

  const handleSelectAll = (checked: boolean) => {
    setDataList((prev) => prev.map((row) => ({ ...row, selected: checked })));
  };
  const handleRowSelect = (id: number, checked: boolean) => {
    setDataList((prev) => prev.map((row) => (row.lead_id === id ? { ...row, selected: checked } : row)));
  };

  const handleBulkUpdate = async (value: any) => {
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
  const refreshfilters = () => {
    localStorage.removeItem("lead_due_filter");
    localStorage.removeItem("lead_assigned_to");
    localStorage.removeItem("lead_status_id");
    localStorage.removeItem("lead_search");
    localStorage.removeItem("dd_callsDoneToday");
    localStorage.removeItem("dd_totalLeadsToday");
    localStorage.removeItem("dd_svd");
    localStorage.removeItem("dd_closure");
    localStorage.removeItem("lead_page");
    localStorage.removeItem("lead_limit");
    localStorage.removeItem("report_view");
    localStorage.removeItem("report_lead_ids");
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }
  useEffect(() => {
    const savedSearch = localStorage.getItem("lead_search") || "";
    setSearchTerm(savedSearch);
    const savedDueFilter = localStorage.getItem("lead_due_filter") || "";
    const savedAssignedTo = localStorage.getItem("lead_assigned_to") || "";
    const savedLeadStatusId = localStorage.getItem("lead_status_id") || "";
    const savedPage = localStorage.getItem("lead_page") || "1";
    const savedLimit = localStorage.getItem("lead_limit") || "100";
    setForm((prev) => ({
      ...prev,
      assigned_to: savedAssignedTo,
      lead_status_id: savedLeadStatusId,
    }));
    setFilters({
      ...filters,
      dueDate: savedDueFilter,
      assigned_to: savedAssignedTo,
      lead_status_id: savedLeadStatusId,
      search: savedSearch,
    });
    fetchData({
      dueDate: savedDueFilter,
      assigned_to: savedAssignedTo,
      lead_status_id: savedLeadStatusId,
      search: savedSearch,
    }, parseInt(savedPage), parseInt(savedLimit));
  }, []);

  useEffect(() => {

    if (form.rm_user_id !== "" && form.rm_user_id != localStorage.getItem("lead_assigned_to")) {
      console.log("user:", form.rm_user_id, "user:", filters.assigned_to);
      setFilters((prev) => ({ ...prev, assigned_to: form.rm_user_id }));
      fetchData({ ...filters, assigned_to: form.rm_user_id }, currentPage, dataPerPage);
    }
  }, [form.rm_user_id]);

  useEffect(() => {
    // fetchData(filters, currentPage, dataPerPage);
  }, [currentPage, dataPerPage]);
  const goEdit = (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    const leadId = e.currentTarget.getAttribute("data-lead-id");
    if (editAccess && leadId) {
      window.location.href = `/leads/${leadId}/edit`;
    }
  };
  return (
    <React.Fragment>

      <div className="col-12">
        <div className="card">
          {/* Filters */}
          <div className="card-body p-1">
            <div className="row g-2 align-items-center mb-2">
              <div className="col-md-2">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={
                    (e) => {
                      const value = e.target.value;
                      setSearchTerm(value);
                      fetchData({ ...filters, search: value }, currentPage, dataPerPage);
                    }
                  }
                  placeholder="Search Leads..."
                  className="form-control"
                />
              </div>

              <div className="col-md-2">
                <select
                  className="form-select"
                  value={filters.dueDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({ ...filters, dueDate: value });
                    fetchData({ ...filters, dueDate: value }, currentPage, dataPerPage);
                  }}>
                  <option value="">All </option>
                  <option value="1">Due</option>
                  <option value="0">Over Due</option>
                  <option value="2">Upcoming</option>
                </select>
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
                    fetchData({ ...filters, lead_status_id: value }, currentPage, dataPerPage);
                  }}
                >
                  <LeadStatusList
                    name="lead_status_id"
                    selected_options={form.lead_status_id}
                    doptionion="All Status"
                  />
                </select>
              </div>
              <div className="col-md-2">
                <UserList form={form} setForm={setForm} doptionion="All Users" />
                <input type="hidden"
                  id="rm_user_id"
                  name="rm_user_id"
                  value={form.rm_user_id} />
              </div>
              <div className="col-md-1">
                <button className="btn btn-sm btn-secondary" onClick={refreshfilters}>Reset</button>
              </div>
              {accessMenuRole(1) &&
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
                <select
                  className="form-select"
                  value={dataPerPage}
                  onChange={(e) => {
                    const limit = Number(e.target.value);

                    setDataPerPage(limit);
                    setCurrentPage(1);

                    fetchData(filters, 1, limit);
                  }}
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Table */}
          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            pageNumbers={pageNumbers}
            indexOfFirstData={(currentPage - 1) * dataPerPage}
            indexOfLastData={currentPage * dataPerPage}
            dataList={filteredData}
            totalRecords={totalRecords}
            dataPerPage={dataPerPage}
          />
          <div id="leadsDiv">
            <div className="table-wrapper">
              <table id="leadsTable" className="table table-hover table-striped">
                <thead>
                  <tr>
                    {accessMenuRole(1) &&
                      <th style={{ width: "5px" }}>
                        <input type="checkbox" onChange={(e) => handleSelectAll(e.target.checked)} checked={dataList.every((row) => row.selected)} />
                      </th>
                    }
                    <th style={{ width: "250px" }} onClick={() => sortColumn("customer_name")}>Lead Name</th>
                    <th style={{ width: "100px" }} onClick={() => sortColumn("mobile_no")}>Contact</th>
                    <th style={{ width: "250px" }} onClick={() => sortColumn("project_name")}>Project</th>
                    <th style={{ width: "120px" }}>Actions</th>
                    <th style={{ width: "150px" }} onClick={() => sortColumn("status")}>Status<div>& Schedule Date</div></th>
                    <th style={{ width: "120px" }} onClick={() => sortColumn("assigned_to")}>Assigned To </th>
                    <th style={{ width: "120px" }} onClick={() => sortColumn("created_at")}>Created At </th>

                    {accessMenuRole(1) &&
                      <th style={{ width: "150px" }} onClick={() => sortColumn("sub_source_name")}>Source</th>
                    }

                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan={8} className="text-center"><Loader /></td></tr>}
                  {error && <tr><td colSpan={8}><Alert variant="danger">{error}</Alert></td></tr>}
                  {!loading && dataList.length === 0 && <tr><td colSpan={8} className="text-center">No records found</td></tr>}
                  {!loading && dataList.map((data) => (
                    <tr key={data.lead_id}>

                      {accessMenuRole(1) &&
                        <td><input type="checkbox" checked={data.selected} onChange={(e) => handleRowSelect(data.lead_id, e.target.checked)} /></td>
                      }

                      <td title={data.customer_name}
                        onClick={goEdit}
                        data-lead-id={data.lead_id}
                      >
                        {(() => {
                          const breakIndex = data.customer_name.indexOf(' ', 20);

                          return breakIndex !== -1 ? (
                            <>
                              {data.customer_name.slice(0, breakIndex)}
                              <br />
                              {data.customer_name.slice(breakIndex + 1)}
                            </>
                          ) : (
                            data.customer_name
                          );
                        })()}
                      </td>
                      <td
                        onClick={goEdit}
                        data-lead-id={data.lead_id}
                      >{data.mobile_no}</td>
                      <td title={data.project_name}
                        onClick={goEdit}
                        data-lead-id={data.lead_id}
                      >
                        {data.project_name?.length > 30 ? (
                          <>
                            {data.project_name.substring(
                              0,
                              data.project_name.indexOf(' ', 30)
                            )}
                            <br />
                            {data.project_name.substring(
                              data.project_name.indexOf(' ', 30) + 1
                            )}
                          </>
                        ) : (
                          data.project_name
                        )}
                      </td>
                      <td>
                        <div className="btn-box">
                          <EditAction id={data.lead_id} page="leads" type="link" link={`/leads/${data.lead_id}/edit`} setRefresh="" menu_id={7} iconclass={false} />

                          <Link
                            title="History"
                            className="btn btn-sm btn-icon btn-secondary"
                            href="javascript:void(0)"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLeadHistory(data); // pass the specific data item here
                            }}
                          >
                            {/* <i className="fa-light fa-history text-white"></i> */}
                            <HistoryCount lead_id={data.lead_id} id={data.lead_id} />
                          </Link>
                          <DeleteAction id={data.lead_id} page="lead" setRefresh="" menu_id={7} iconclass={false} reload={true} />
                        </div>
                      </td>
                      <td
                        onClick={goEdit}
                        data-lead-id={data.lead_id}
                        className={`text-${data.status_color ? data.status_color : 'secondary'}`}>
                        {data.status}
                        <div className="text-white">{showDateNa(data.schedule_date)}</div>
                      </td>
                      <td
                        onClick={goEdit}
                        data-lead-id={data.lead_id}
                        title={data.assigned_to}>
                        {data.assigned_to?.length > 25 ? (
                          <>
                            {data.assigned_to.substring(
                              0,
                              data.assigned_to.indexOf(' ', 25)
                            )}
                            <br />
                            {data.assigned_to.substring(
                              data.assigned_to.indexOf(' ', 25) + 1
                            )}
                          </>
                        ) : (
                          data.assigned_to
                        )}
                      </td>
                      <td>
                        <div className="text-white">
                          {data.created_at
                            ? showDateNa(data.created_at)
                            : ""}
                        </div>
                      </td>
                      {accessMenuRole(1) &&
                        <td title={data.sub_source_name}>
                          {(() => {
                            const breakIndex = data.sub_source_name?.indexOf(' ', 10);

                            return breakIndex !== -1 ? (
                              <>
                                {data.sub_source_name?.slice(0, breakIndex)}
                                <br />
                                {data.sub_source_name?.slice(breakIndex + 1)}
                              </>
                            ) : (
                              data.sub_source_name
                            );
                          })()}
                        </td>
                      }


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination */}

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