"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Table, Form, Row, Col } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "../PaginationSection";
import RoleName from "./RoleName";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import RoleList from "./RoleList";
import ManagerName from "./ManagerName";
import "../lead-manage/Leads.scss";

const ScrollDataTableSection = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(100);
  const [dataList, setDataList] = useState<Array<any>>([]);

  // Column Filters
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone_no: "",
    role_id: "",
  });

  // Sorting
  const [sortConfig, setSortConfig] = useState<any>({
    key: "",
    direction: "asc",
  });

  // Fetch Users
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/user?view=1",
      );
      const result = await response.json();
      console.log("Fetched Users:", result);
      setDataList(result);
    };
    fetchData();
  }, [props]);

  // Filtering
  const filteredData = useMemo(() => {
    return dataList.filter((item) => {
      return (
        item.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
        item.email?.toLowerCase().includes(filters.email.toLowerCase()) &&
        item.phone_no?.toLowerCase().includes(filters.phone_no.toLowerCase()) &&
        (filters.role_id === "" ||
          String(item.role_id) === filters.role_id)
      );
    });
  }, [dataList, filters]);

  // Sorting
  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(sortedData.length / dataPerPage);

  const requestSort = (key: string) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
    setCurrentPage(1);
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="card-body p-3">

          {/* Filters */}
          <Row className="mb-3">
            <Col>
              <Form.Control
                placeholder="Search Name"
                onChange={(e) =>
                  handleFilterChange("name", e.target.value)
                }
              />
            </Col>

            <Col>
              <Form.Control
                placeholder="Search Email"
                onChange={(e) =>
                  handleFilterChange("email", e.target.value)
                }
              />
            </Col>

            <Col>
              <Form.Control
                placeholder="Search Phone"
                onChange={(e) =>
                  handleFilterChange("phone_no", e.target.value)
                }
              />
            </Col>

            <Col>
              <Form.Select
                value={filters.role_id}
                onChange={(e) =>
                  handleFilterChange("role_id", e.target.value)
                }
              >
                <RoleList
                  name="reporting_to_id"
                  selected_options={"full"}
                />
              </Form.Select>
            </Col>
          </Row>

          <OverlayScrollbarsComponent>
            <div style={{ maxHeight: "300px" }}>
              <table id="leadsTable" className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th
                      style={{ cursor: "pointer" }}
                      onClick={() => requestSort("name")}
                    >
                      Name
                    </th>
                    <th
                      style={{ cursor: "pointer" }}
                      onClick={() => requestSort("email")}
                    >
                      Email
                    </th>
                    <th
                      style={{ cursor: "pointer" }}
                      onClick={() => requestSort("phone_no")}
                    >
                      Phone
                    </th>
                    <th>Reporting To</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <tr key={item.id}>
                        <td style={{ fontSize: "14px" }}>{item.name}<br />
                        <i style={{ fontSize: "12px" }}>{item.role_name}</i>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.phone_no}</td>
                        <td>{item.reporting_user_name}</td>
                        <td style={{ textTransform: "capitalize", color: item.active === 0 ? "white" : "red" }}>
                          {item.active === 0 ? "Active" : "Deactive"}
                        </td>
                        <td>
                          <div className="btn-box">
                          <EditAction 
                            id={item?.user_id}
                            page="user"
                            type="link"
                            link={`/user/${item?.user_id}/edit`}
                            setRefresh={props?.setRefresh}
                            menu_id={4}
                          />
                          <DeleteAction
                            id={item?.user_id}
                            page="user"
                            setRefresh={props?.setRefresh}
                            menu_id={4}
                          />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </OverlayScrollbarsComponent>

          <PaginationSection
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={setCurrentPage}
            pageNumbers={[...Array(totalPages)].map((_, i) => i + 1)}
            indexOfFirstData={indexOfFirstData}
            indexOfLastData={indexOfLastData}
            dataList={sortedData}
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollDataTableSection;
