"use client";
import { recentOrderTableData } from "@/data/data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React from "react";

const RecentOrder = () => {
  return (
    <div className="col-xxl-8">
      <div className="panel recent-order">
        <div className="panel-header">
          <h5>Recent Orders</h5>
          <div id="tableSearch"></div>
        </div>
        <div className="panel-body">
          <OverlayScrollbarsComponent>
            <table
              className="table table-dashed recent-order-table dataTable no-footer"
              id="myTable"
            >
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Order Date</th>
                  <th>Payment Method</th>
                  <th>Delivery Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrderTableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.startDate}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.endDate}</td>
                    <td>{item.amount}</td>
                    <td>
                      <span className="badge bg-success">{item.status}</span>
                    </td>
                    <td>
                      <div className="btn-box">
                        <button>
                          <i className="fa-light fa-eye"></i>
                        </button>
                        <button>
                          <i className="fa-light fa-pen"></i>
                        </button>
                        <button>
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
            <div className="dataTables_info">Showing 1 to 8 of 8</div>
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

export default RecentOrder;
