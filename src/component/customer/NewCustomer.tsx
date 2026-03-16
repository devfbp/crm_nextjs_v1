import { customerTableData } from "@/data/data";
import React from "react";

const NewCustomer = () => {
  return (
    <div className="col-xxl-4 col-md-6">
      <div className="panel">
        <div className="panel-header">
          <h5>New Customers</h5>
        </div>
        <div className="panel-body">
          <table className="table table-borderless new-customer-table">
            <tbody>
              {customerTableData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="new-customer">
                      <div className="part-img">
                        <img src={item.image} alt="Image" />
                      </div>
                      <div className="part-txt">
                        <p className="customer-name">{item.name}</p>
                        <span>{item.username}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.orders} Orders</td>
                  <td>${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewCustomer;
