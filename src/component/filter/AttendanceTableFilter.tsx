"use client";
import React from "react";
import { Form } from "react-bootstrap";
import SelectFilter from "./SelectFilter";
import { useDigiContext } from "@/context/DigiContext";
import DefinedRangeCalender from "../calender/DefinedRangeCalender";
import { editTaskModalOptions } from "@/data/data";

const AttendanceTableFilter = () => {
  const { filterDropdown, headerFilterRef, toggleFilterDropdown } =
    useDigiContext();
  return (
    <div className="table-filter-option attendance-table-filter">
      <div className="row g-3">
        <div className="col-sm-10 col-9 col-xs-12">
          <div className="row g-3">
            <div className="col">
              <form className="row g-2">
                <div className="col">
                  <Form.Select
                    className="form-control form-control-sm"
                    data-placeholder="Bulk action"
                  >
                    <option value="">Bulk action</option>
                    <option value="0">Move to trash</option>
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
              <Form.Select
                className="form-control form-control-sm select-search"
                data-placeholder="Select Employee"
              >
                <option value="">Select Employee</option>
                {editTaskModalOptions.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </div>
            <DefinedRangeCalender />
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
                  className={`digi-scroll-dropdown digi-dropdown-menu dropdown-menu ${
                    filterDropdown ? "show" : ""
                  }`}
                >
                  <li className="dropdown-title">Filter Options</li>
                  <li>
                    <div className="form-check">
                      <Form.Check id="showSelectEmployee" />
                      <label
                        className="form-check-label"
                        htmlFor="filterEmployee"
                      >
                        Select Employee
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Form.Check id="showDate" />
                      <label
                        className="form-check-label"
                        htmlFor="filterDateRange"
                      >
                        Date Range
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2 col-3 col-xs-12 d-flex justify-content-end align-items-center">
          <div id="employeeTableLength">
            <SelectFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTableFilter;
