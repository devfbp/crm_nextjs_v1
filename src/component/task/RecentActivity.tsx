import React from "react";
import Link from "next/link";
import { recentActivityTableData } from "@/data/data";
const RecentActivity = () => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Recent Activity</h5>
          <div className="btn-box">
            <Link href="#" className="btn btn-sm btn-primary">
              View All
            </Link>
          </div>
        </div>
        <div className="panel-body">
          <ul className="hr-recent-activity">
            {recentActivityTableData.map((item, index) => (
              <li key={index}>
                <div className="left">
                  <span className="activity-name">{item.activityName}</span>
                  <span className="activity-short">{item.activityShort}</span>
                </div>
                <div className="right">
                  <span className="activity-time">{item.activityTime}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
