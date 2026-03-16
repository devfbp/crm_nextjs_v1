"use client";
import { attendanceTableData } from "@/data/data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React, { useState } from "react";

const Attendance = () => {
  const [data, setData] = useState(attendanceTableData);

  const handleDeleteClick = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  return (
    <div className="col-xxl-6 col-md-8">
      <div className="panel">
        <div className="panel-header">
          <h5>Attendance</h5>
          <div id="tableSearch"></div>
        </div>
        <div className="panel-body">
          <OverlayScrollbarsComponent>
            <table
              className="table table-hover attendance-table digi-dataTable"
              id="myTable"
            >
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Employee</th>
                  <th>Status</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <span className="badge bg-primary rounded px-2">
                        {item.status}
                      </span>
                    </td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}m</td>
                    <td>
                      <div className="btn-box">
                        <button>
                          <i className="fa-light fa-eye"></i>
                        </button>
                        <button>
                          <i className="fa-light fa-pen"></i>
                        </button>
                        <button onClick={() => handleDeleteClick(index)}>
                          <i className="fa-light fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </OverlayScrollbarsComponent>
          <div className="table-bottom-control">
            <div className="dataTables_info">
              Showing 1 to {data.length} of {data.length}
            </div>
            <div className="dataTables_paginate paging_simple_numbers">
              <button className="btn btn-primary previous disabled">
                <i className="fa-light fa-angle-left"></i>
              </button>
              <span>
                <button className="btn btn-primary current">1</button>
              </span>
              <button className="btn btn-primary next disabled">
                <i className="fa-light fa-angle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
