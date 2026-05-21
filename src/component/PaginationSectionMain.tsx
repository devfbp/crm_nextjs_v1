"use client";
import React from "react";

type Props<T> = {
  indexOfFirstData: number;
  indexOfLastData: number;
  dataList: T[];
  currentPage: number;
  paginate: (pageNumber: number) => void;
  totalPages: number;
  totalRecords: number;
  dataPerPage: number;
  pageNumbers: number[];
};

const PaginationSection = <T,>({
  indexOfFirstData,
  indexOfLastData,
  dataList,
  currentPage,
  paginate,
  totalPages,
  totalRecords,
  pageNumbers,
}: Props<T>) => {

  // Generate pagination with dots
  const getPaginationRange = () => {
    const delta = 10; // pages before & after current
    const range: (number | string)[] = [];

    // Always show first page
    range.push(1);

    // Left dots
    if (currentPage - delta > 2) {
      range.push("...");
    }

    // Middle pages
    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    // Right dots
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="table-bottom-control">
      <div className="dataTables_info">
        Showing {indexOfFirstData + 1} to{" "}
        {Math.min(indexOfFirstData + dataList.length, indexOfLastData)} of{" "}
        {totalRecords}
      </div>

      <div className="dataTables_paginate paging_simple_numbers">

        {/* Previous */}
        <button
          className={`btn btn-primary previous ${
            currentPage === 1 ? "disabled" : ""
          }`}
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <i className="fa-light fa-angle-left"></i>
        </button>

        {/* Page Numbers */}
        {paginationRange.map((item, index) => {
          if (item === "...") {
            return (
              <button
                key={`dots-${index}`}
                className="btn btn-primary disabled"
                disabled
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={item}
              className={`btn btn-primary ${
                currentPage === item ? "current" : ""
              }`}
              onClick={() => paginate(Number(item))}
            >
              {item}
            </button>
          );
        })}

        {/* Next */}
        <button
          className={`btn btn-primary next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PaginationSection;