"use client";
import React from "react";
import CountUp from "react-countup";

const CrmDashboardCards = () => {
  return (
    <div className="row mb-30">
      <div className="col-lg-3 col-6 col-xs-12">
        <div className="dashboard-top-box d-block rounded border-0 panel-bg">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div className="right">
              <div className="part-icon text-light rounded">
                <span>
                  <i className="fa-light fa-user-plus"></i>
                </span>
              </div>
            </div>
            <div className="left">
              <h3 className="fw-normal">
                <CountUp end={11460} />
              </h3>
            </div>
          </div>
          <div className="progress-box">
            <p className="d-flex justify-content-between mb-1">
              Total Leads in CRM
            </p>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6 col-xs-12">
        <div className="dashboard-top-box d-block rounded border-0 panel-bg">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div className="right">
              <div className="part-icon text-light rounded">
                <span>
                  <i className="fa-light fa-user-secret"></i>
                </span>
              </div>
            </div>
            <div className="left">
              <h3 className="fw-normal">
                <CountUp end={150} />
              </h3>
            </div>
          </div>
          <div className="progress-box">
            <p className="d-flex justify-content-between mb-1">
              Total Calls Done Today
            </p>
            <div className="progress">
              <div
                className="progress-bar bg-primary"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6 col-xs-12">
        <div className="dashboard-top-box d-block rounded border-0 panel-bg">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div className="right">
              <div className="part-icon text-light rounded">
                <span>
                  <i className="fa-light fa-money-bill"></i>
                </span>
              </div>
            </div>
            <div className="left">
              <h3 className="fw-normal">
                <CountUp end={1060} />
              </h3>
            </div>
          </div>
          <div className="progress-box">
            <p className="d-flex justify-content-between mb-1">
              Total Leads
            </p>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6 col-xs-12">
        <div className="dashboard-top-box d-block rounded border-0 panel-bg">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div className="right">
              <div className="part-icon text-light rounded">
                <span>
                  <i className="fa-light fa-file"></i>
                </span>
              </div>
            </div>
            <div className="left">
              <h3 className="fw-normal">
                <CountUp end={11} />
              </h3>
            </div>
          </div>
          <div className="progress-box">
            <p className="d-flex justify-content-between mb-1">
              Today’s Pending Calls (Due & Over due calls)
            </p>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-6 col-xs-12">
        <div className="dashboard-top-box d-block rounded border-0 panel-bg">
          <div className="d-flex justify-content-between align-items-center mb-20">
            <div className="right">
              <div className="part-icon text-light rounded">
                <span>
                  <i className="fa-light fa-file"></i>
                </span>
              </div>
            </div>
            <div className="left">
              <h3 className="fw-normal">
                <CountUp end={16} />
              </h3>
            </div>
          </div>
          <div className="progress-box">
            <p className="d-flex justify-content-between mb-1">
              SVD
            </p>
            <div className="progress">
              <div
                className="progress-bar bg-danger"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrmDashboardCards;
