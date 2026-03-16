"use client";
import React from "react";
import SelectFilter from "./SelectFilter";
import { Form } from "react-bootstrap";
import { useDigiContext } from "@/context/DigiContext";
import DefinedRangeCalender from "@/component/calender/DefinedRangeCalender";

const TaskTableFilter = () => {
  const { filterDropdown, headerFilterRef, toggleFilterDropdown } =
    useDigiContext();
  return (
    <div className="table-filter-option task-table-header">
      <div className="row g-3">
        <div className="col-xl-10 col-md-10 col-9 col-xs-8">
          <div className="row g-3">
            <div className="col">
              <form className="row g-2">
                <div className="col">
                  <Form.Select
                    className="form-control form-control-sm"
                    defaultValue="1"
                  >
                    <option value="1">Bulk action</option>
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
                className="form-control form-control-sm"
                defaultValue="5"
              >
                <option value="5">Select Status</option>
                <option value="0">Not Started</option>
                <option value="1">Pending</option>
                <option value="2">On Hold</option>
                <option value="3">In Progress</option>
                <option value="4">Completed</option>
              </Form.Select>
            </div>
            <DefinedRangeCalender />
            <div className="col">
              <Form.Select
                className="form-control form-control-sm"
                defaultValue="4"
              >
                <option value="4">Select Priority</option>
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
                <option value="3">Urgent</option>
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
                  className={`digi-dropdown-menu dropdown-menu ${
                    filterDropdown ? "show" : ""
                  }`}
                >
                  <li className="dropdown-title">Filter Options</li>
                  <li>
                    <div className="form-check">
                      <Form.Check id="showTaskStatus" />
                      <label
                        className="form-check-label"
                        htmlFor="filterTaskStatus"
                      >
                        Task Status
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Form.Check id="showDateRange" />
                      <label
                        className="form-check-label"
                        htmlFor="filterDateRange"
                      >
                        Date Range
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <Form.Check id="showTaskPriority" />
                      <label
                        className="form-check-label"
                        htmlFor="filterTaskPriority"
                      >
                        Task Priority
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-2 col-3 col-xs-4 d-flex justify-content-end align-items-top">
          <div id="employeeTableLength">
            <SelectFilter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTableFilter;
