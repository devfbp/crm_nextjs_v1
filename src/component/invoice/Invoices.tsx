import React from "react";
import Link from "next/link";
import { invoiceTableData } from "@/data/data";

const Invoices = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Invoices</h5>
        <Link className="btn btn-sm btn-primary" href="/order">
          View All
        </Link>
      </div>
      <div className="panel-body p-0">
        <div className="table-responsive">
          <table className="table invoice-table table-hover">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client</th>
                <th>Due Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {invoiceTableData.map((item, index) => (
                <tr key={index}>
                  <td>{item.invoice}</td>
                  <td>{item.customer}</td>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>
                    <span className="d-block text-end">
                      <span
                        className={`badge ${
                          item.status === "Paid" ? "bg-success" : "bg-primary"
                        } px-2`}
                      >
                        {item.status}
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
