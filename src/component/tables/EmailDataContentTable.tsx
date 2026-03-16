"use client";
import React, { useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
import { emailData } from "@/data/data";
import { EmailType } from "@/types";
import { useDigiContext } from "@/context/DigiContext";

const EmailDataContentTable = () => {
  const { handleMailDetailsBtn } = useDigiContext();
  const [currentEmailPage, setCurrentEmailPage] = useState<number>(1);
  const [dataPerEmailPage] = useState<number>(10);
  const dataEmailList: EmailType[] = emailData;

  // Pagination logic
  const indexOfLastEmailData: number = currentEmailPage * dataPerEmailPage;
  const indexOfFirstEmailData: number = indexOfLastEmailData - dataPerEmailPage;
  const currentEmailData: EmailType[] = dataEmailList.slice(
    indexOfFirstEmailData,
    indexOfLastEmailData
  );

  const paginateEmail = (pageNumber: number) => {
    setCurrentEmailPage(pageNumber);
  };

  // Calculate total number of email pages
  const totalEmailPages: number = Math.ceil(
    dataEmailList.length / dataPerEmailPage
  );
  const emailPageNumbers: number[] = [];
  for (let i = 1; i <= totalEmailPages; i++) {
    emailPageNumbers.push(i);
  }
  return (
    <>
      <OverlayScrollbarsComponent>
        <table className="table table-dashed table-hover digi-dataTable email-table">
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input markAllMail"
                    type="checkbox"
                  />
                </div>
              </th>
              <th className="no-sort">
                <i className="fa-light fa-star"></i>
              </th>
              <th>Sender</th>
              <th>Subject</th>
              <th className="no-sort">
                <i className="fa-light fa-paperclip"></i>
              </th>
              <th className="no-sort">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmailData.map((data) => (
              <tr className="unread" key={data.id}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <button className="btn-star starred">
                    <i className="fa-solid fa-star"></i>
                  </button>
                </td>
                <td>
                  <span
                    className="table-txt"
                    role="button"
                    onClick={handleMailDetailsBtn}
                  >
                    {data.name}
                  </span>
                </td>
                <td>
                  <span
                    className="table-txt"
                    role="button"
                    onClick={handleMailDetailsBtn}
                  >
                    {data.email_content}
                  </span>
                </td>
                <td>
                  <i className="fa-light fa-paperclip"></i>
                </td>
                <td>
                  <div className="btn-box ms-0">
                    <button className="btn-flush">
                      <i className="fa-light fa-box-archive"></i>
                    </button>
                    <button className="btn-flush">
                      <i className="fa-light fa-circle-exclamation"></i>
                    </button>
                    <button className="btn-flush">
                      <i className="fa-light fa-envelope"></i>
                    </button>
                    <button className="btn-flush">
                      <i className="fa-light fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </OverlayScrollbarsComponent>
      <PaginationSection
        currentPage={currentEmailPage}
        totalPages={totalEmailPages}
        paginate={paginateEmail}
        pageNumbers={emailPageNumbers}
        indexOfFirstData={indexOfFirstEmailData}
        indexOfLastData={indexOfLastEmailData}
        dataList={emailData}
      />
    </>
  );
};

export default EmailDataContentTable;
