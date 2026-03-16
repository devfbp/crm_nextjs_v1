import { socialTableData } from "@/data/data";
import React from "react";

const SocialVisitors = () => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="panel social-visitor">
        <div className="panel-header">
          <h5>Social Media Visitor</h5>
          <div className="btn-box d-sm-block d-none">
            <button className="btn btn-sm btn-outline-primary">Week</button>
            <button className="btn btn-sm btn-outline-primary">Month</button>
            <button className="btn btn-sm btn-outline-primary">Year</button>
          </div>
        </div>
        <div className="panel-body">
          <table className="table table-borderless visitor-table">
            <thead>
              <tr>
                <th>Sources</th>
                <th>Visitor</th>
              </tr>
            </thead>
            <tbody>
              {socialTableData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={item.span}>
                      <i className={item.icon}></i>
                    </span>{" "}
                    {item.name}
                  </td>
                  <td>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SocialVisitors;
