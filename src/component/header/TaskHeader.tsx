"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";

const TaskHeader = () => {
  const { dropdown, headerRef, toggleDropdown, handleShowAddNewTaskModal } =
    useDigiContext();

  return (
    <div className="panel-header">
      <h2>Task Summary</h2>
      <div className="btn-box d-flex flex-wrap gap-2">
        <div id="tableSearch">
          <input type="text" placeholder="Search..." />
        </div>
        <button className="btn btn-sm btn-icon btn-outline-primary">
          <i className="fa-light fa-arrows-rotate"></i>
        </button>
        <div className="digi-dropdown dropdown" ref={headerRef}>
          <button
            className={`btn btn-sm btn-icon btn-outline-primary ${
              dropdown ? "show" : ""
            }`}
            onClick={toggleDropdown}
          >
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </button>
          <ul className={`dropdown-menu ${dropdown ? "show" : ""}`}>
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showName"
                />
                <label className="form-check-label" htmlFor="showName">
                  Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showStatus"
                />
                <label className="form-check-label" htmlFor="showStatus">
                  Status
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showStartDate"
                />
                <label className="form-check-label" htmlFor="showStartDate">
                  Start Date
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showDueDate"
                />
                <label className="form-check-label" htmlFor="showDueDate">
                  Due Date
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showAssignedTo"
                />
                <label className="form-check-label" htmlFor="showAssignedTo">
                  Assigned To
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPriority"
                />
                <label className="form-check-label" htmlFor="showPriority">
                  Priority
                </label>
              </div>
            </li>
            <li className="dropdown-title pb-1">Showing</li>
            <li>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control form-control-sm w-50"
                  value="10"
                  readOnly
                />
                <button className="btn btn-sm btn-primary w-50">Apply</button>
              </div>
            </li>
          </ul>
        </div>
        <button
          className="btn btn-sm btn-primary"
          onClick={handleShowAddNewTaskModal}
        >
          <i className="fa-light fa-plus"></i> Add New
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;
