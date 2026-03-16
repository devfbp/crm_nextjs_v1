"use client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
import { companyData } from "@/data/data";
const CompanyTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [datalist, setDatalist] = useState(companyData);
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
          className="table table-dashed table-hover digi-dataTable company-table table-striped"
          id="companyTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllCompany"
                  />
                </div>
              </th>
              <th>Company</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Contact Person</th>
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
                <td>{data.company}</td>
                <td>{data.address}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.contactPerson}</td>
                <td>
                  <div className="form-switch">
                    <Form.Check
                      type="switch"
                      id="table-check-input"
                      checked={data.isChecked || false}
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
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={datalist}
      />
    </>
  );
};

export default CompanyTable;
