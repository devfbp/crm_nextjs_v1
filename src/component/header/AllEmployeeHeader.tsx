"use client";
import React from "react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useDigiContext } from "@/context/DigiContext";

const AllEmployeeHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  return (
    <div className="panel-header">
      <h2>All Employee</h2>
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
          <ul
            className={`digi-dropdown-menu dropdown-menu ${
              dropdown ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showEmployeeId" />
                <label className="form-check-label" htmlFor="showEmployeeId">
                  Employee ID
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPhoto" />
                <label className="form-check-label" htmlFor="showPhoto">
                  Photo
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
                <Form.Check type="checkbox" id="showSection" />
                <label className="form-check-label" htmlFor="showSection">
                  Section
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPhone" />
                <label className="form-check-label" htmlFor="showPhone">
                  Phone
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPresentAddress" />
                <label
                  className="form-check-label"
                  htmlFor="showPresentAddress"
                >
                  Present Address
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
        <Link href="/add-employee" className="btn btn-sm btn-primary">
          <i className="fa-light fa-plus"></i> Add New
        </Link>
      </div>
    </div>
  );
};

export default AllEmployeeHeader;
