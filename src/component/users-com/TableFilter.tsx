"use client";
import React from "react";
import SelectFilter from "./SelectFilter";
import { Form } from "react-bootstrap";

const TableFilter = () => {
  return (
    <div className="table-filter-option">
      <div className="row g-3 justify-content-between ">
        <div className="col-8 col-lg-5 col-md-6">
          <form className="row g-2">
            <div className="col-7 col-sm-5">
              <Form.Select className="form-control form-control-sm">
                <option value="0">Bulk action</option>
                <option value="1">Move to trash</option>
              </Form.Select>
            </div>
            <div className="col-4">
              <button className="btn btn-sm btn-primary w-100">Apply</button>
            </div>
          </form>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <SelectFilter />
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
