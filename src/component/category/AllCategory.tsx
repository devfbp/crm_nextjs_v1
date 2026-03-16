"use client";
import React from "react";
import { Form } from "react-bootstrap";
import CategoryTable from "../tables/CategoryTable";
import { useDigiContext } from "@/context/DigiContext";
import SelectFilter from "../filter/SelectFilter";

const AllCategory = () => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  return (
    <div className="col-xxl-8 col-md-7">
      <div className="panel">
        <div className="panel-header">
          <h5>All Categories</h5>
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
                    <Form.Check type="checkbox" id="showName" />
                    <label className="form-check-label" htmlFor="showName">
                      Name
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <Form.Check type="checkbox" id="showDesc" />
                    <label
                      className="form-check-label"
                      htmlFor="showDescription"
                    >
                      Description
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <Form.Check type="checkbox" id="showSlug" />
                    <label className="form-check-label" htmlFor="showSlug">
                      Slug
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <Form.Check type="checkbox" id="showCount" />
                    <label className="form-check-label" htmlFor="showCount">
                      Count
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
                    <button className="btn btn-sm btn-primary w-50">
                      Apply
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="table-filter-option">
            <div className="row justify-content-between g-3">
              <div className="col-xxl-4 col-6 col-xs-12">
                <form className="row g-2">
                  <div className="col-8">
                    <Form.Select className="form-control form-control-sm">
                      <option value="">Bulk action</option>
                      <option value="0">Edit</option>
                      <option value="1">Move To Trash</option>
                    </Form.Select>
                  </div>
                  <div className="col-4">
                    <button className="btn btn-sm btn-primary w-100">
                      Apply
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-xl-2 col-3 col-xs-12 d-flex justify-content-end">
                <SelectFilter />
              </div>
            </div>
          </div>
          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default AllCategory;
