"use client";
import React from "react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { useDigiContext } from "@/context/DigiContext";

const AllProductHeader = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  return (
    <div className="panel-header">
      <h2>All Products</h2>
      <div className="btn-box d-flex flex-wrap gap-2">
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
                <Form.Check type="checkbox" id="showProducts" />
                <label className="form-check-label" htmlFor="showProduct">
                  Products
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showPublished" />
                <label className="form-check-label" htmlFor="showPublished">
                  Published
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showStock" />
                <label className="form-check-label" htmlFor="showStock">
                  Stock
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
                <Form.Check type="checkbox" id="showSales" />
                <label className="form-check-label" htmlFor="showSales">
                  Sales
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showRating" />
                <label className="form-check-label" htmlFor="showRating">
                  Rating
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
        <div className="btn-box">
          <Link href="/add-new-product" className="btn btn-sm btn-primary">
            <i className="fa-light fa-plus"></i> Add New
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllProductHeader;
