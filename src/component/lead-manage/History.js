"use client";
import React, { useEffect, useState } from "react";
import "./Leads.scss";
import { showDateTime } from "../utils/common-client";

const History = (props) => {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    console.log("Props in History component:", props);
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/lead-status-entry?lead_view=1&lead_id=" +
          props.lead_id
      );
      const result = await response.json();
      setRecords(result);
    };

    fetchData();
  }, [props.lead_id]);

  return (
    <>
      {/* Scroll Container */}
      <div className="scrollContainer">
        <ul className="timeline-wrapper timeline">
          {records &&
            records.map((item, index) => (
              <li key={index} className="timeline-item">
                <div className="timeline-dot" style={{ backgroundColor: "red" }}></div>
                <div className="timeline-content">
                  <div className="top-row">
                    <div>
                      <strong>User:</strong> {item.created_by_name}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                        {showDateTime(item.created_at)}
                    </div>
                  </div>

                  <div className="mid-row">
                    <div>
                      <strong>From:</strong> {item.from_user_name}
                    </div>
                    <div>
                      <strong>To:</strong> {item.user_name}
                    </div>
                  </div>

                  <div className="mid-row">
                    <div>
                      <strong>Status: </strong>
                      <span className={`text-`+item.from_status_color}>{item.from_status}</span> →{" "}
                      <span className={`text-`+item.to_status_color}>{item.to_status}</span>
                    </div>
                  </div>

                  <div className="remarks">
                    <strong>Remarks:</strong> {item.remarks || "N/A"}
                  </div>
                </div>
              </li>
            ))}
        </ul>
        {props.remarks && (
          <div className="remarks" style={{ marginTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <strong>Lead Remarks:</strong> {props.remarks}
          </div>
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Scroll container (THIS is the actual scroll element) */
        

        /* Timeline base */
        .timeline {
          list-style: none;
          padding: 0;
          margin: 0;
          position: relative;
        }

        /* vertical line */
        .timeline::before {
          content: "";
          position: absolute;
          top: 0;
          left: 18px;
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
        }

        .timeline-item {
          position: relative;
          padding-left: 50px;
          margin-bottom: 20px;
          color: #fff;
        }

        /* dot */
        .timeline-dot {
          position: absolute;
          left: 10px;
          top: 5px;
          width: 16px;
          height: 16px;
          // background: #4caf50;
          border-radius: 50%;
          border: 3px solid #1e1e1e;
        }

        .timeline-content {
          background: rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 8px;
        }

        .top-row,
        .mid-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 6px;
        }

        .remarks {
          margin-top: 8px;
          font-size: 13px;
          color: #ddd;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 6px;
        }
      `}</style>
    </>
  );
};

export default React.memo(History);