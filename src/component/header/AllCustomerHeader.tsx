"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import { Form } from "react-bootstrap";

const AllCustomerHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  return (
    <div className="panel-header">
      <h2>All Customer</h2>
      <div className="btn-box d-flex gap-2">
        <div id="tableSearch">
          <Form.Control type="text" placeholder="Seach..." />
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
                <Form.Check type="checkbox" id="showName" />
                <label className="form-check-label" htmlFor="showName">
                  Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showUserName" />
                <label className="form-check-label" htmlFor="showUsername">
                  Username
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showLastActive" />
                <label className="form-check-label" htmlFor="showLastActive">
                  Last Active
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showDateRegistered" />
                <label
                  className="form-check-label"
                  htmlFor="showDateRegistered"
                >
                  Date Registered
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showEmail" />
                <label className="form-check-label" htmlFor="showEmail">
                  Email
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showOrders" />
                <label className="form-check-label" htmlFor="showOrders">
                  Orders
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showTotalSpent" />
                <label className="form-check-label" htmlFor="showTotalSpend">
                  Total Spend
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showAov" />
                <label className="form-check-label" htmlFor="showAOV">
                  AOV
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showCountry" />
                <label className="form-check-label" htmlFor="showCountryRegion">
                  Country/Region
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showCity" />
                <label className="form-check-label" htmlFor="showCity">
                  City
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showRegion" />
                <label className="form-check-label" htmlFor="showRegion">
                  Region
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPostalCode" />
                <label className="form-check-label" htmlFor="showPostalCode">
                  Postal Code
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

export default AllCustomerHeader;
