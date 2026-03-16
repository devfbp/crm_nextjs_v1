"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import { Form } from "react-bootstrap";

const AttendanceHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  return (
    <div className="panel-header">
      <h2>Attendance</h2>
      <div className="btn-box d-flex gap-2">
        <div id="tableSearch">
          <Form.Control type="text" placeholder="Search..." />
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
          <ul
            className={`digi-dropdown-menu dropdown-menu ${
              dropdown ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showDate" />
                <label className="form-check-label" htmlFor="showDate">
                  Date
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showName" />
                <label className="form-check-label" htmlFor="showName">
                  Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showEmployeeID" />
                <label className="form-check-label" htmlFor="showEmployeeId">
                  Employee Id
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showDivision" />
                <label className="form-check-label" htmlFor="showDivision">
                  Division
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showCheckIn" />
                <label
                  className="form-check-label"
                  htmlFor="showChekinCheckout"
                >
                  Chek In - Check Out
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showStatus" />
                <label className="form-check-label" htmlFor="showStatus">
                  Status
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showShift" />
                <label className="form-check-label" htmlFor="showShift">
                  Shift
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showAction" />
                <label className="form-check-label" htmlFor="showAction">
                  Action
                </label>
              </div>
            </li>
            <li className="dropdown-title pb-1">Showing</li>
            <li>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control form-control-sm w-50"
                  placeholder="10"
                />
                <button className="btn btn-sm btn-primary w-50">Apply</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHeader;
