"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import { Form } from "react-bootstrap";

const CustomerHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();

  return (
    <div className="panel-header">
      <h2>Customers</h2>
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
                <Form.Check id="showAction" />
                <label className="form-check-label" htmlFor="showAction">
                  Action
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showCustomerId" />
                <label className="form-check-label" htmlFor="showCustomerId">
                  Customer ID
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showName" />
                <label className="form-check-label" htmlFor="showName">
                  Name
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showPhone" />
                <label className="form-check-label" htmlFor="showPhone">
                  Phone
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showGroup" />
                <label className="form-check-label" htmlFor="showGroup">
                  Group
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showCustomerType" />
                <label className="form-check-label" htmlFor="showCustomerType">
                  Customer Type
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showCreditLimit" />
                <label className="form-check-label" htmlFor="showCreditLimit">
                  Credit Limit
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showOpeningBalance" />
                <label
                  className="form-check-label"
                  htmlFor="showOpeningBalance"
                >
                  Opening Balance
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showDebit" />
                <label className="form-check-label" htmlFor="showDebit">
                  Debit
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showCredit" />
                <label className="form-check-label" htmlFor="showCredit">
                  Credit
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showClosingBalance" />
                <label
                  className="form-check-label"
                  htmlFor="showClosingBalance"
                >
                  Closing Balance
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check id="showStatus" />
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

export default CustomerHeader;
