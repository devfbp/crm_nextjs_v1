import React, { useEffect, useRef } from "react";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";

const DashboardPart = () => {
  const { toggleMainSidebarDropdown, mainSidebarDropdown, mainRef } =
    useDigiContext();

  return (
    <li className="sidebar-item">
      <a
        role="button"
        className={`sidebar-link-group-title has-sub ${
          mainSidebarDropdown.includes("dashboard") ? "show" : ""
        }`}
        onClick={() => toggleMainSidebarDropdown("dashboard")}
      >
        Dashboard
      </a>
      <ul
        className={`sidebar-link-group ${
          mainSidebarDropdown.includes("dashboard") ? "show" : ""
        }`}
      >
        <li className="sidebar-dropdown-item">
          <Link href="/" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-cart-shopping-fast"></i>
            </span>{" "}
            <span className="sidebar-txt">eCommerce</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/crm-dashboard" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-user-headset"></i>
            </span>{" "}
            <span className="sidebar-txt">CRM</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/hrm-dashboard" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-user-tie"></i>
            </span>{" "}
            <span className="sidebar-txt">HRM</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default DashboardPart;
