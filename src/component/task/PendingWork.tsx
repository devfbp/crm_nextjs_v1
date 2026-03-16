import { pendingWorkTableData } from "@/data/data";
import React from "react";

const PendingWork = () => {
  return (
    <div className="col-lg-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pending Works</h5>
        </div>
        <div className="panel-body p-0">
          <table className="table table-hover pending-task-table" tabIndex={1}>
            <tbody>
              {pendingWorkTableData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="task-box">
                      <span>{item.title}</span>
                      <span>Jul 25, 2017 for Alimul Alrazy</span>
                    </div>
                  </td>
                  <td>
                    <span className="d-block text-end">
                      <span className={`badge ${item.badge} px-2`}>
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

export default PendingWork;
