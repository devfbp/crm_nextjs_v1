import React from "react";
import Link from "next/link";
import { upcomingInterviewTableData } from "@/data/data";

const UpcomingInterview = () => {
  return (
    <div className="col-xxl-3 col-md-4">
      <div className="panel">
        <div className="panel-header">
          <h5>Upcoming Interviews</h5>
          <div className="btn-box">
            <Link href="#" className="btn btn-sm btn-outline-primary">
              View All
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <ul className="upcoming-interview">
            {upcomingInterviewTableData.map((item, index) => (
              <li key={index}>
                <div className="avatar avatar-lg">
                  <img src={item.avatar} className="rounded" alt="user" />
                </div>
                <div className="part-txt">
                  <span className="applicant-name">{item.name}</span>
                  <span className="applicant-role">
                    <small>
                      <span className="text-muted">{item.role}</span>
                    </small>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpcomingInterview;
