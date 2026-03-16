"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import { Form } from "react-bootstrap";

const OrderHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();

  return (
    <div className="panel-header">
      <h2>All Order</h2>
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
                <Form.Check type="checkbox" id="showOrderId" />
                <label className="form-check-label" htmlFor="showOrderId">
                  Order ID
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showCustomer" />
                <label className="form-check-label" htmlFor="showCustomer">
                  Customer
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
                <Form.Check type="checkbox" id="showProduct" />
                <label className="form-check-label" htmlFor="showProduct">
                  Product
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPrice" />
                <label className="form-check-label" htmlFor="showPrice">
                  Price
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPaymentMethod" />
                <label className="form-check-label" htmlFor="showPaymentMethod">
                  Payment Method
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showDeliveryStatus" />
                <label
                  className="form-check-label"
                  htmlFor="showDeliveryStatus"
                >
                  Delivery Status
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showOrderDate" />
                <label className="form-check-label" htmlFor="showOrderDate">
                  Order Date
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

export default OrderHeader;
