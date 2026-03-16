"use client";
import React from "react";
import { Form } from "react-bootstrap";
import SelectFilter from "./SelectFilter";
import { useDigiContext } from "@/context/DigiContext";
const AllEmployeeTableFilter = () => {
  const { filterDropdown, headerFilterRef, toggleFilterDropdown } =
    useDigiContext();
  return (
    <div className="all-employee-filter table-filter-option">
      <div className="row g-3">
        <div className="col-xl-10 col-9 col-xs-12">
          <div className="row g-3">
            <div className="col">
              <form className="row g-2">
                <div className="col">
                  <Form.Select className="form-control form-control-sm">
                    <option value="0">Bulk action</option>
                    <option value="1">Move to trash</option>
                  </Form.Select>
                </div>
                <div className="col">
                  <button className="btn btn-sm btn-primary w-100">
                    Apply
                  </button>
                </div>
              </form>
            </div>
            <div className="col">
              <Form.Select className="form-control form-control-sm">
                <option value="0">Active</option>
                <option value="1">Pending</option>
                <option value="2">Inactive</option>
                <option value="3">Hold</option>
              </Form.Select>
            </div>
            <div className="col">
              <button className="btn btn-sm btn-primary">
                <i className="fa-light fa-filter"></i> Filter
              </button>
            </div>
            <div className="col justify-content-center align-items-center">
              <div className="digi-dropdown dropdown" ref={headerFilterRef}>
                <button
                  className={`btn btn-sm btn-icon btn-primary ${
                    filterDropdown ? "show" : ""
                  }`}
                  onClick={toggleFilterDropdown}
                >
                  <i
                    className={`fa-regular ${
                      filterDropdown ? "fa-minus" : "fa-plus"
                    }`}
                  ></i>
                </button>
                <ul
                  className={`digi-scroll-dropdown right-sided digi-dropdown-menu dropdown-menu ${
                    filterDropdown ? "show" : ""
                  }`}
                >
                  <li className="dropdown-title">Filter Options</li>
                  <li>
                    <div className="form-check">
                      <Form.Check type="checkbox" id="filterActiveStatus" />
                      <label className="form-check-label">Active Status</label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-3 col-xs-12 d-flex justify-content-end align-items-center">
          <SelectFilter />
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeTableFilter;
