import { noticeTableData2 } from "@/data/data";
import React from "react";

const NoticeBoard2 = () => {
  return (
    <div className="col-xxl-3 col-md-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Notice Board</h5>
        </div>
        <div className="panel-body">
          <ul className="hr-notice-board">
            {noticeTableData2.map((item, index) => (
              <li key={index}>
                <div className="activity-box">
                  <div className="date-box date-box-lg">
                    <span>{item.date}</span>
                    <span>{item.month}</span>
                  </div>
                  <div className="part-txt">
                    <span>{item.activity}</span>
                    <span className="text-muted">{item.time}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard2;
