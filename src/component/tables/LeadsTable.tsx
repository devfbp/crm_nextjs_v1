"use client";
import React, { useEffect, useRef, useState } from "react";
import PaginationSection from "./PaginationSection";
import { leadsData } from "@/data/data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const AdminLead = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState(
    leadsData.map((data) => ({ ...data, showDropdown: false }))
  );
  const [openDropdownIndices, setOpenDropdownIndices] = useState<number[]>([]);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>(
    Array(dataList.length).fill(null)
  );

  const handleDropdownToggle = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    event.stopPropagation(); // Prevent the event from propagating to the document
    const updatedOpenDropdownIndices = [...openDropdownIndices];
    const existingIndex = openDropdownIndices.indexOf(index);
    if (existingIndex !== -1) {
      updatedOpenDropdownIndices.splice(existingIndex, 1);
    } else {
      updatedOpenDropdownIndices.push(index);
    }
    setOpenDropdownIndices(updatedOpenDropdownIndices);
    setDataList((prevData) =>
      prevData.map((data, i) => ({
        ...data,
        showDropdown: updatedOpenDropdownIndices.includes(i),
      }))
    );
  };

  const handleDelete = (id: number) => {
    setDataList((prevData) => prevData.filter((data) => data.id !== id));
  };

  const handleEdit = (index: number) => {
    // Handle edit action
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        !dropdownRefs.current.some((ref) => ref?.contains(event.target as Node))
      ) {
        // Clicked outside the dropdowns, close them
        setOpenDropdownIndices([]);
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
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      <OverlayScrollbarsComponent>
        <table
          className="table table-dashed table-hover digi-dataTable leads-table table-striped"
          id="leadsTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllLeads"
                  />
                </div>
              </th>
              <th>Action</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Company</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={data.id}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <div
                    
                    className="digi-dropdown dropdown d-inline-block"
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
                      className={`digi-dropdown-menu dropdown-menu dropdown-slim dropdown-menu-sm ${
                        data.showDropdown ? "show" : ""
                      }`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDelete(data.id)}
                        >
                          <span className="dropdown-icon">
                            <i className="fa-light fa-trash-can"></i>
                          </span>{" "}
                          Delete
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEdit(indexOfFirstData + index)}
                        >
                          <span className="dropdown-icon">
                            <i className="fa-light fa-pen-to-square"></i>
                          </span>{" "}
                          Edit
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
                <td>{data.name}</td>
                <td>{data.address}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td>{data.company}</td>
                <td>{data.description}</td>
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

export default AdminLead;
