"use client";
import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import PaginationSection from "../PaginationSectionMain";
import { toast } from "react-toastify";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import Link from "next/link";
import { Alert } from "react-bootstrap";
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
import ProjectList from "./ProjectList2";
import DatePicker from "react-datepicker";

// Wait this long after the last keystroke before searching on the server.
const SEARCH_DEBOUNCE_MS = 400;

// Save a filter so it is restored when the user comes back to this page, or
// remove it when the filter was cleared (otherwise a cleared filter came back).
const saveFilter = (key: string, value: any) => {
  if (value) {
    localStorage.setItem(key, String(value));
  } else {
    localStorage.removeItem(key);
  }
};

type LeadRowProps = {
  data: any;
  isAdmin: boolean;
  onEdit: (e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => void;
  onSelect: (id: number, checked: boolean) => void;
  onHistory: (data: any) => void;
};

// One table row. Memoized so typing in the search box or ticking one checkbox
// doesn't re-render every row on the page (up to 1000).
const LeadRow = React.memo(function LeadRow({ data, isAdmin, onEdit, onSelect, onHistory }: LeadRowProps) {
  return (
    <tr>

      {isAdmin &&
        <td><input type="checkbox" checked={data.selected} onChange={(e) => onSelect(data.lead_id, e.target.checked)} /></td>
      }

      <td title={data.customer_name}
        onClick={onEdit}
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
        onClick={onEdit}
        data-lead-id={data.lead_id}
      >{data.mobile_no}</td>
      <td title={data.project_name}
        onClick={onEdit}
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
              onHistory(data); // pass the specific data item here
            }}
          >
            {/* <i className="fa-light fa-history text-white"></i> */}
            <HistoryCount lead_id={data.lead_id} id={data.lead_id} count={data.history_count} />
          </Link>
          <DeleteAction id={data.lead_id} page="lead" setRefresh="" menu_id={7} iconclass={false} reload={true} />
        </div>
      </td>
      <td
        onClick={onEdit}
        data-lead-id={data.lead_id}
        className={`text-${data.status_color ? data.status_color : 'secondary'}`}>
        {data.status}
        <div className="text-white">{showDateNa(data.schedule_date)}</div>
      </td>
      <td
        onClick={onEdit}
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
      {isAdmin &&
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
  );
});

const LeadsTable = (props: any) => {
  const router = useRouter();
  const [form, setForm] = useState({
    rm_user_id: "",
    lead_status_id: "",
    suserer_id: "",
    project_id: "",
    created_date: "",
    from_date: "",
    to_date: ""
  });
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    user: "",
    dueDate: "",
    assigned_to: "",
    lead_status_id: "",
    created_date: "",
    project_id: "",
    from_date: "",
    to_date: ""
  });
  const [dataList, setDataList] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showLeadHistory, setShowLeadHistory] = useState(false);
  const [navQuickToggleValue] = useState(props?.fullwidth);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [editAccess, setEditAccess] = useState(false);
  const [historyLead, setHistoryLead] = useState<any | null>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter] = useState("");
  const [userFilter] = useState("");
  const { navQuickToggle } = useDigiContext();
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSizeOptions = [10, 50, 100, 250, 500, 1000];
  const [lastRefresh] = useState(new Date());
  // In-flight list request; aborted when a newer one starts so a slow, older
  // response can't overwrite newer results.
  const fetchAbortRef = useRef<AbortController | null>(null);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Read the session cookie once per render instead of three times per row
  const isAdmin = accessMenuRole(1);

  useEffect(() => {
    setEditAccess(accessMenuCheck(7, 3));
  }, [navQuickToggle, navQuickToggleValue]);

  // Cancel a pending search / request when leaving the page
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      fetchAbortRef.current?.abort();
    };
  }, []);

  const fetchData = async (filters: any, pageNumber: number, dataPerPage: number) => {
    // This request already carries the latest search text (it's kept in
    // `filters`), so a search still waiting on its debounce timer would only
    // repeat it with older filters. Drop it.
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }
    fetchAbortRef.current?.abort();
    const controller = new AbortController();
    fetchAbortRef.current = controller;

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
      }
      saveFilter("lead_due_filter", filters.dueDate);

      const search = filters.search ?? searchTerm ?? "";
      if (search) {
        body.search = search;
      }
      saveFilter("lead_search", search);

      if (filters.assigned_to) {
        body.assigned_to = filters.assigned_to;
      }
      saveFilter("lead_assigned_to", filters.assigned_to);

      if (filters.project_id) {
        body.project_id = filters.project_id;
      }
      saveFilter("project_id", filters.project_id);

      if (filters.from_date) {
        body.from_date = filters.from_date;
      }
      saveFilter("from_date", filters.from_date);

      if (filters.to_date) {
        body.to_date = filters.to_date;
      }
      saveFilter("to_date", filters.to_date);

      const hasLeadStatus = filters.lead_status_id && filters.lead_status_id > 0;
      if (hasLeadStatus) {
        body.lead_status_id = filters.lead_status_id;
      }
      saveFilter("lead_status_id", hasLeadStatus ? filters.lead_status_id : "");

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

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const result = await response.json();
      if (controller.signal.aborted) return;
      const loaddata = result.data || result;

      setDataList(loaddata.map((r: any) => ({ ...r, selected: false })));
      setTotalRecords(result.total);

    } catch (error: any) {
      if (error?.name === "AbortError") return; // replaced by a newer request
      console.error(error);
      setError("Error fetching data");
    } finally {
      if (fetchAbortRef.current === controller) {
        setLoading(false);
      }
    }
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
  // Stable (useCallback) so memoized rows don't all re-render
  const handleRowSelect = useCallback((id: number, checked: boolean) => {
    setDataList((prev) => prev.map((row) => (row.lead_id === id ? { ...row, selected: checked } : row)));
  }, []);

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

  const handleLeadHistory = useCallback((data: any) => {
    setHistoryLead(data);
    setShowLeadHistory(true);
  }, []);
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
    localStorage.removeItem("project_id");
    localStorage.removeItem("from_date");
    localStorage.removeItem("to_date");
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
    const savedProjectId = localStorage.getItem("project_id") || "";
    setCurrentPage(parseInt(savedPage));
    setDataPerPage(parseInt(savedLimit));
    setForm((prev) => ({
      ...prev,
      rm_user_id: savedAssignedTo,
      project_id: savedProjectId,
      lead_status_id: savedLeadStatusId,
    }));
    setFilters({
      ...filters,
      dueDate: savedDueFilter,
      assigned_to: savedAssignedTo,
      project_id: savedProjectId,
      lead_status_id: savedLeadStatusId,
      search: savedSearch,
    });
    fetchData({
      dueDate: savedDueFilter,
      assigned_to: savedAssignedTo,
      project_id: savedProjectId,
      lead_status_id: savedLeadStatusId,
      search: savedSearch,
    }, parseInt(savedPage), parseInt(savedLimit));
  }, []);

  // Reload when the user filter changes, including when cleared to "--Select--".
  // Compared against the active filter (not localStorage) so the initial mount
  // and the restore-from-localStorage step don't trigger an extra fetch.
  useEffect(() => {
    const value = String(form.rm_user_id ?? "");
    if (value === String(filters.assigned_to ?? "")) return;
    setFilters((prev) => ({ ...prev, assigned_to: value }));
    fetchData({ ...filters, assigned_to: value }, currentPage, dataPerPage);
  }, [form.rm_user_id]);

  // Reload when the project filter changes, including when cleared to "--Select--".
  useEffect(() => {
    const value = String(form.project_id ?? "");
    if (value === String(filters.project_id ?? "")) return;
    setFilters((prev) => ({ ...prev, project_id: value }));
    fetchData({ ...filters, project_id: value }, currentPage, dataPerPage);
  }, [form.project_id]);

  // Reload when a created-from / created-to date is picked or cleared
  useEffect(() => {
    const value = form.from_date || "";
    if (value === (filters.from_date || "")) return;
    setFilters((prev) => ({ ...prev, from_date: value }));
    fetchData({ ...filters, from_date: value }, currentPage, dataPerPage);
  }, [form.from_date]);

  useEffect(() => {
    const value = form.to_date || "";
    if (value === (filters.to_date || "")) return;
    setFilters((prev) => ({ ...prev, to_date: value }));
    fetchData({ ...filters, to_date: value }, currentPage, dataPerPage);
  }, [form.to_date]);

  // Open the lead with client-side navigation (no full page reload)
  const goEdit = useCallback((e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
    const leadId = e.currentTarget.getAttribute("data-lead-id");
    if (editAccess && leadId) {
      router.push(`/leads/${leadId}/edit`);
    }
  }, [editAccess, router]);

  return (
    <React.Fragment>

      <div className="col-12">
        <div className="card">
          {/* Filters */}
          <><div>Last Refresh: {lastRefresh.toLocaleTimeString()}</div></>
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
                      setFilters((prev) => ({ ...prev, search: value }));
                      // Search once the user pauses typing, not on every key
                      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
                      searchDebounceRef.current = setTimeout(() => {
                        fetchData({ ...filters, search: value }, currentPage, dataPerPage);
                      }, SEARCH_DEBOUNCE_MS);
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
                <UserList form={form} setForm={setForm} doptionion="All Users"  />
                <input type="hidden"
                  onChange={(e) => {
                    const value = e.target.value;
                    localStorage.setItem("lead_assigned_to", value);
                  }}
                  id="rm_user_id"
                  name="rm_user_id"
                  value={form.rm_user_id} />
              </div>

              <div className="col-md-2">
                <ProjectList form={form} setForm={setForm} />
                <input type="hidden"
                  id="project_id"
                  name="project_id"
                  value={form.project_id} />
              </div>
              <div className="col-md-2 ms-auto">
                <button className="btn btn-sm btn-secondary" onClick={refreshfilters}>Reset</button>
              </div>
              <div className="col-md-2">
                <div className="input-group-with-icon">
                  <DatePicker
                    selected={form.from_date ? new Date(form.from_date) : null}
                    onChange={(date) =>
                      setForm({
                        ...form,
                        from_date: date ? date.toISOString() : "",
                      })
                    }
                    dateFormat="dd-MM-yyyy"
                    name="from_date"
                    id="from_date"
                    autoComplete="off"
                    placeholderText="Created From"

                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="input-group-with-icon">
                  <DatePicker
                    selected={form.to_date ? new Date(form.to_date) : null}
                    onChange={(date) =>
                      setForm({
                        ...form,
                        to_date: date ? date.toISOString() : "",
                      })
                    }
                    dateFormat="dd-MM-yyyy"
                    name="to_date"
                    id="to_date"
                    autoComplete="off"
                    placeholderText="Created To"

                  />
                </div>
              </div>
              {isAdmin &&
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
                    {isAdmin &&
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

                    {isAdmin &&
                      <th style={{ width: "150px" }} onClick={() => sortColumn("sub_source_name")}>Source</th>
                    }

                  </tr>
                </thead>
                <tbody>
                  {loading && <tr><td colSpan={8} className="text-center"><Loader /></td></tr>}
                  {error && <tr><td colSpan={8}><Alert variant="danger">{error}</Alert></td></tr>}
                  {!loading && dataList.length === 0 && <tr><td colSpan={8} className="text-center">No records found</td></tr>}
                  {!loading && dataList.map((data) => (
                    <LeadRow
                      key={data.lead_id}
                      data={data}
                      isAdmin={isAdmin}
                      onEdit={goEdit}
                      onSelect={handleRowSelect}
                      onHistory={handleLeadHistory}
                    />
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
