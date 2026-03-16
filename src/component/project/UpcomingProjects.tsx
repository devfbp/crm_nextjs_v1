import React from "react";
import Link from "next/link";
import { upcomingProjectTableData } from "@/data/data";

const UpcomingProjects = () => {
  return (
    <div className="col-lg-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Upcoming Activities</h5>
          <div className="btn-box">
            <Link href="/calendar" className="btn btn-sm btn-primary">
              View All
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <div className="table-responsive">
            <table className="table table-hover table-activity">
              <tbody>
                {upcomingProjectTableData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="activity-box">
                        <div className="date-box">
                          <span>{item.day}</span>
                          <span>{item.month}</span>
                        </div>
                        <div className="part-txt">
                          <span>{item.title}</span>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="avatar-box justify-content-end">
                        <div className="avatar">
                          <img src="assets/images/avatar-2.png" alt="image" />
                        </div>
                        <div className="avatar">
                          <img src="assets/images/avatar-3.png" alt="image" />
                        </div>
                        <div className="avatar">
                          <img src="assets/images/avatar-4.png" alt="image" />
                        </div>
                        <div className="avatar bg-primary rounded-circle d-flex justify-content-center align-items-center text-white">
                          6
                        </div>
                      </div>
                    </td>
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

export default UpcomingProjects;
