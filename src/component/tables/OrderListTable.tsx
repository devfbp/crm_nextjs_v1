"use client";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Link from "next/link";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
import { orderListData } from "@/data/data";
interface Order {
  order_id: number;
  customer_name: string;
  status: string;
  product_number: number;
  price: number;
  payment_method: string;
  delivery_status: string;
  order_date: string;
  badge: string;
}

const OrderListTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataPerPage] = useState<number>(10);
  const [dataList, setDataList] = useState<Order[]>(orderListData);

  // Pagination logic
  const indexOfLastData: number = currentPage * dataPerPage;
  const indexOfFirstData: number = indexOfLastData - dataPerPage;
  const currentData: Order[] = dataList.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  // Delete function
  const handleDelete = (orderId: number): void => {
    const updatedDataList: Order[] = dataList.filter(
      (data) => data.order_id !== orderId
    );
    setDataList(updatedDataList);
  };

  // Calculate total number of pages
  const totalPages: number = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers: number[] = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );
  return (
    <>
      <OverlayScrollbarsComponent>
        <Table
          className="table table-dashed table-hover digi-dataTable all-product-table table-striped"
          id="allProductTable"
        >
          <thead>
            <tr>
              <th className="no-sort">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="markAllProduct"
                  />
                </div>
              </th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Product</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Delivery Status</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((data) => (
              <tr key={data.order_id}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </td>
                <td>
                  <Link href="/invoices">#{data.order_id}</Link>
                </td>
                <td>{data.customer_name}</td>
                <td>
                  <span className="text-danger">{data.status}</span>
                </td>
                <td>{data.product_number}</td>
                <td>${data.price}</td>
                <td>{data.payment_method}</td>
                <td>
                  <span className={`badge ${data.badge}`}>
                    {data.delivery_status}
                  </span>
                </td>
                <td>{data.order_date}</td>
                <td>
                  <div className="btn-box">
                    <button>
                      <i className="fa-light fa-eye"></i>
                    </button>
                    <button>
                      <i className="fa-light fa-pen"></i>
                    </button>
                    <button onClick={() => handleDelete(data.order_id)}>
                      <i className="fa-light fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </OverlayScrollbarsComponent>
      <PaginationSection
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={dataList}
      />
    </>
  );
};

export default OrderListTable;
