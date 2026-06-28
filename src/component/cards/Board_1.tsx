"use client";
import React from "react";
import CountUp from "react-countup";
import { useState, useEffect } from "react";

const Board1 = (props: { activeTab: number; setActiveTab: (tab: number) => void }) => {
  const [totalLeads, setTotalLeads] = useState(0);
  const [callsDoneToday, setCallsDoneToday] = useState(0);
  const [totalLeadsToday, setTotalLeadsToday] = useState(0);
  const [svd, setSvd] = useState(0);
  const [NumberofClosuresDone, setNumberofClosuresDone] = useState(0);
  const [LastBookingDate, setLastBookingDate] = useState(null);
  const [TotalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/dashboard?activeTab=' + props.activeTab);
        const data = await response.json();
        setTotalLeads(data.totalLeads);
        setCallsDoneToday(data.callsDoneToday);
        setTotalLeadsToday(data.totalLeadsToday);
        setSvd(data.svd);
        setNumberofClosuresDone(data.NumberofClosuresDone);
        setLastBookingDate(data.LastBookingDate);
        setTotalRevenue(data.TotalRevenue);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [props.activeTab]);


  return (
    <div className="row mb-30">
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">
              Total Active Leads in CRM
            </p>
            <h3 className="fw-normal" 
              onClick={() => { window.location.href = '/leads'; }} 
              style={{ cursor: 'pointer' }}>
              <CountUp end={totalLeads} />
            </h3>
            <p className="text-muted">
              {/* <small>12490 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-success">
              <span>
                <i className="fa-light fa-user-plus "></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">Total Calls Done Today</p>
            <h3 className="fw-normal" 
              onClick={() => { 
                localStorage.setItem("dd_callsDoneToday", "true");
                window.location.href = '/leads';
              }} 
              style={{ cursor: 'pointer' }}>
              <CountUp end={callsDoneToday} />
            </h3>
            <p className="text-muted">
              {/* <small>480 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-primary">
              <span>
                <i className="fa-light fa-bullhorn"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">Today Total Leads</p>
            <h3 className="fw-normal"
              onClick={() => { 
                localStorage.setItem("dd_totalLeadsToday", "true");
                window.location.href = '/leads';
              }} 
              style={{ cursor: 'pointer' }}
              >
              <CountUp end={totalLeadsToday} />
            </h3>
            <p className="text-muted">
              {/* <small>$2440 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-info">
              <span>
                <i className="fa-light fa-dollar-sign"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">
              SVD
            </p>
            <h3 className="fw-normal"
              onClick={() => { 
                localStorage.setItem("dd_svd", "true");
                window.location.href = '/leads';
              }}
              style={{ cursor: 'pointer' }}
            >
              <CountUp end={svd} />
            </h3>
            <p className="text-muted">
              {/* <small>124 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-danger">
              <span>
                <i className="fa-light fa-magnifying-glass-chart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">
              Number of Closures done
            </p>
            <h3 className="fw-normal"
              onClick={() => { 
                localStorage.setItem("dd_closure", "true");
                window.location.href = '/leads';
              }}
              style={{ cursor: 'pointer' }}
            >
              <CountUp end={NumberofClosuresDone} />
            </h3>
            <p className="text-muted">
              {/* <small>124 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-warning">
              <span>
                <i className="fa-light fa-chart-line"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">
              Number of Days Last Booking done
            </p>
            <h3 className="fw-normal">
              {LastBookingDate ? new Date(LastBookingDate).toLocaleDateString(process.env.NEXT_PUBLIC_DATE_FORMAT) : 'N/A'}
            </h3>
            <p className="text-muted">
              {/* <small>124 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-secondary">
              <span>
                <i className="fa-light fa-calendar-days"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-6 col-xs-12 border-2 border-secondary">
        <div className="dashboard-top-box dashboard-top-box-2 rounded border-0 panel-bg">
          <div className="left">
            <p className="d-flex justify-content-between mb-2">
              Total Revenue Generated
            </p>
            <h3 className="fw-normal">
              {TotalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
            </h3>
            <p className="text-muted">
              {/* <small>124 for last month</small> */}
            </p>
          </div>
          <div className="right">
            <div className="part-icon text-light rounded bg-warning">
              <span>
                <i className="fa-light fa-rupee-sign"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board1;
