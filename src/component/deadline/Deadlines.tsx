import React from "react";
import Link from "next/link";
import { deadlineTableData } from "@/data/data";

const Deadlines = () => {
  return (
    <div className="col-xl-8 col-lg-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Works Deadlines</h5>
          <Link className="btn btn-sm btn-primary" href="/task">
            View All
          </Link>
        </div>
        <div className="panel-body p-0">
          <div className="table-responsive">
            <table className="table deadline-table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Contacted</th>
                  <th>Sales Representative</th>
                  <th>Status</th>
                  <th>Deal Value</th>
                </tr>
              </thead>
              <tbody>
                {deadlineTableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.companyName}</td>
                    <td>{item.date}</td>
                    <td>{item.contactPerson}</td>
                    <td>
                      <span className="badge bg-primary-subtle px-2 rounded">
                        {item.status}
                      </span>
                    </td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deadlines;
