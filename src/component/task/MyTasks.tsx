"use client";
import React from "react";
import Link from "next/link";
import { useDigiContext } from "@/context/DigiContext";
import { taskTableData } from "@/data/data";

const MyTasks = () => {
  const { handleShowAddNewTaskModal } = useDigiContext();
  return (
    <div className="col-xl-4 col-lg-5">
      <div className="panel">
        <div className="panel-header">
          <h5>My Tasks</h5>
          <button
            className="btn btn-sm btn-primary"
            onClick={handleShowAddNewTaskModal}
          >
            Add Task <i className="fa-light fa-plus"></i>
          </button>
        </div>
        <div className="panel-body p-0">
          <div className="table-responsive">
            <table className="table task-table table-hover">
              <tbody>
                {taskTableData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="form-check">
                        <label className="form-check-label">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                          />
                          {item.task}
                        </label>
                      </div>
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="btn-box px-lg-3 px-2 mx-xl-1 m-lg-0 mx-1 py-2">
            <Link
              href="/task"
              className="view-all-task text-white fs-14 text-decoration-underline"
            >
              Show More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTasks;
