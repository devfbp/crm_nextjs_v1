"use client";
import React, { useEffect, useState, useMemo } from "react";
import PaginationSection from "../PaginationSection";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import StatusName from "./StatusName";
import ProjectName from "./ProjectName";
import UserName from "./UserName";
import EditAction from "../action/Edit";
import DeleteAction from "../action/Delete";
import "./Leads.scss";
import Link from "next/link";
import { tr } from "date-fns/locale";


const LeadsTable = (props) => {
  
  return (
    <div className="col-12">
      <div className="card">
        <OverlayScrollbarsComponent>
          <table
            className="table table-dashed table-hover digi-dataTable leads-table table-striped"
            id="leadsTable"
          >
            <thead>
              <tr>
                <th>Created User</th>
                <th>Created Date</th>
                <th>From Status</th>
                <th>To Status</th>
              </tr>
            </thead>

            <tbody>
              {props?.records &&
                props?.records?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.user_name}</td>
                      <td>{item.created_at}</td>
                      <td>{item.from_status}</td>
                      <td>{item.to_status}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};

export default LeadsTable;