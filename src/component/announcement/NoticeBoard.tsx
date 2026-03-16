"use client";
import React, { useState } from "react";
import Link from "next/link";
import { noticeTableData } from "@/data/data";

const NoticeBoard = () => {
  const [data, setData] = useState(noticeTableData);

  const handleDeleteClick = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div className="col-xl-4 col-lg-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Notice Board</h5>
          <Link href="#" passHref>
            <button className="btn btn-sm btn-primary">View All</button>
          </Link>
        </div>
        <div className="panel-body p-0">
          <div className="table-responsive">
            <table className="table notice-board-table table-hover">
              <thead>
                <tr>
                  <th>Notice</th>
                  <th>Published By</th>
                  <th>Date Added</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.date}</td>
                    <td>
                      <div className="btn-box d-flex justify-content-end gap-3">
                        <button className="btn-flush">
                          <i className="fa-light fa-eye"></i>
                        </button>
                        <button className="btn-flush">
                          <i className="fa-light fa-pen"></i>
                        </button>
                        <button
                          className="btn-flush"
                          onClick={() => handleDeleteClick(index)}
                        >
                          <i className="fa-light fa-trash-can"></i>
                        </button>
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

export default NoticeBoard;
