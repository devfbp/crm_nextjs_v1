"use client";
import React, { useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
import { audienceData } from "@/data/data";
import { Form } from "react-bootstrap";

const AudienceTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [datalist, setDatalist] = useState(audienceData);
  const dataPerPage = 10;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = datalist.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(datalist.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleCheckboxChange = (index: number) => {
    const updatedDataList = [...datalist];
    updatedDataList[indexOfFirstData + index].isChecked =
      !updatedDataList[indexOfFirstData + index].isChecked;
    // Assuming you want to update datalist after changing isChecked
    setDatalist(updatedDataList);
  };

  return (
    <>
      <OverlayScrollbarsComponent>
        <table
          className="table table-dashed table-hover digi-dataTable target-audience-table table-striped"
          id="targetAudienceTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllAudience"
                  />
                </div>
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Position</th>
              <th>Last Login</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data, index) => (
              <tr key={data.id}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.company}</td>
                <td>{data.phone}</td>
                <td>{data.occupation}</td>
                <td>{data.timestamp}</td>
                <td>
                  <div className="form-switch">
                    <Form.Check
                      type="switch"
                      id="table-check-input"
                      checked={data.isChecked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OverlayScrollbarsComponent>
      <PaginationSection
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={audienceData}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
      />
    </>
  );
};

export default AudienceTable;
