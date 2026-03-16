"use client";
import React, { useState, useRef, useEffect } from "react";
import { Form } from "react-bootstrap";
import PaginationSection from "./PaginationSection";
import { customerData } from "@/data/data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const CustomerTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState(
    customerData.map((data) => ({ ...data, showDropdown: false }))
  );

  const handleCheckboxChange = (index: number) => {
    const updatedDataList = [...dataList];
    updatedDataList[indexOfFirstData + index].isChecked =
      !updatedDataList[indexOfFirstData + index].isChecked;
    setDataList(updatedDataList);
  };

  const dropdownRefs = useRef<Array<HTMLDivElement | null>>(
    Array(dataList.length).fill(null)
  );

  const handleDropdownToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation(); // Prevent the event from propagating to the document
    setDataList((prevData) =>
      prevData.map((data, i) => ({
        ...data,
        showDropdown: i === index ? !data.showDropdown : false,
      }))
    );
  };

  const handleEdit = (customerId: number) => {
    // Handle edit action
  };

  const handleDelete = (customerId: number) => {
    setDataList((prevData) =>
      prevData.filter((data) => data.customerId !== customerId)
    );
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !dropdownRefs.current.some((ref) => ref?.contains(event.target as Node))
      ) {
        // Clicked outside the dropdowns, close them
        setDataList((prevData) =>
          prevData.map((data) => ({ ...data, showDropdown: false }))
        );
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <OverlayScrollbarsComponent>
        <table
          className="table table-dashed table-hover digi-dataTable all-customer-table table-striped"
          id="allCustomerTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllCustomer"
                  />
                </div>
              </th>
              <th>Action</th>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Group</th>
              <th>Customer Type</th>
              <th>Credit Limit</th>
              <th>Opening Balance</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Closing Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={data.customerId}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <div
                    className="digi-dropdown dropdown d-inline-block"
                    ref={(ref) => (dropdownRefs.current[index] = ref)}
                  >
                    <button
                      className={`btn btn-sm btn-outline-primary ${
                        data.showDropdown ? "show" : ""
                      }`}
                      onClick={(event) =>
                        handleDropdownToggle(event, indexOfFirstData + index)
                      }
                    >
                      Action <i className="fa-regular fa-angle-down"></i>
                    </button>
                    <ul
                      className={`digi-table-dropdown digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                        data.showDropdown ? "show" : ""
                      }`}
                    >
                      <li>
                        <a
                          href="#"
                          className="dropdown-item"
                          onClick={() => handleEdit(data.customerId)}
                        >
                          <span className="dropdown-icon">
                            <i className="fa-light fa-pen-to-square"></i>
                          </span>{" "}
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="dropdown-item"
                          onClick={() => handleDelete(data.customerId)}
                        >
                          <span className="dropdown-icon">
                            <i className="fa-light fa-trash-can"></i>
                          </span>{" "}
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{data.customerId}</td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>{data.group}</td>
                <td>{data.customerType}</td>
                <td>{data.creditLimit}</td>
                <td>{data.openingBalance}</td>
                <td>{data.debit}</td>
                <td>{data.credit}</td>
                <td>{data.closingBalance}</td>
                <td>
                  <div className="form-switch">
                    <Form.Check
                      type="switch"
                      id="table-check-input"
                      checked={data.isChecked || false}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OverlayScrollbarsComponent>

      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={dataList}
      />
    </>
  );
};

export default CustomerTable;
