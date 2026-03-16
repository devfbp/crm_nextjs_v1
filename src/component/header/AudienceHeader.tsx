"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";

const AudienceHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();

  return (
    <div className="panel-header">
      <h2>Target Audience</h2>
      <div className="btn-box d-flex gap-2">
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
                <input type="checkbox" id="showFirstName" />
                <label className="form-check-label" htmlFor="showFirstName">
                  First Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showLastName" />
                <label className="form-check-label" htmlFor="showLastName">
                  Last Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showEmail" />
                <label className="form-check-label" htmlFor="showEmail">
                  Email
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showCompany" />
                <label className="form-check-label" htmlFor="showCompany">
                  Company
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showPhone" />
                <label className="form-check-label" htmlFor="showPhone">
                  Phone
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showPosition" />
                <label className="form-check-label" htmlFor="showPosition">
                  Position
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showLastLogin" />
                <label className="form-check-label" htmlFor="showLastLogin">
                  Last Login
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <input type="checkbox" id="showStatus" />
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
      </div>
    </div>
  );
};

export default AudienceHeader;
