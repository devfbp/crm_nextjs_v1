"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

const CompanyHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();

  return (
    <div className="panel-header">
      <h2>Companies</h2>
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
            className={`digi-dropdown-menu dropdown-menu  ${
              dropdown ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showCompany"
                />
                <label className="form-check-label" htmlFor="showCompany">
                  Company
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showAddress"
                />
                <label className="form-check-label" htmlFor="showAddress">
                  Address
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showEmail"
                />
                <label className="form-check-label" htmlFor="showEmail">
                  Email
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPhone"
                />
                <label className="form-check-label" htmlFor="showPhone">
                  Phone
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showContactPerson"
                />
                <label className="form-check-label" htmlFor="showContactPerson">
                  Contact Person
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
      </div>
    </div>
  );
};

export default CompanyHeader;
