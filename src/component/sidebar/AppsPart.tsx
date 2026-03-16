"use client";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";
import React from "react";

const AppsPart = () => {
  const {
    toggleMainSidebarDropdown,
    mainSidebarDropdown,
    openSubMenu,
    toggleSubMenu,
    mainRef,
  } = useDigiContext();

  return (
    <li className="sidebar-item">
      <a
        role="button"
        className={`sidebar-link-group-title has-sub  ${
          mainSidebarDropdown.includes("apps") ? "show" : ""
        }`}
        onClick={() => toggleMainSidebarDropdown("apps")}
      >
        Apps
      </a>
      <ul
        className={`sidebar-link-group  ${
          mainSidebarDropdown.includes("apps") ? "show" : ""
        }`}
      >
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "crm" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("crm")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-headset"></i>
            </span>
            <span className="sidebar-txt">CRM</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "crm" ? "show" : ""
            }`}
            id="crmDropdown"
          >
            <li className="sidebar-dropdown-item">
              <Link href="/audience" className="sidebar-link">
                Target Audience
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/company" className="sidebar-link">
                Company
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/task" className="sidebar-link">
                Task
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/leads" className="sidebar-link">
                Leads
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/customer" className="sidebar-link">
                Customer
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "hrm" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("hrm")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-tie"></i>
            </span>{" "}
            <span className="sidebar-txt">HRM</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "hrm" ? "show" : ""
            }`}
            id="hrmDropdown"
          >
            <li className="sidebar-dropdown-item">
              <Link href="/add-employee" className="sidebar-link">
                Add Employee
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/all-employee" className="sidebar-link">
                All Employee
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/attendance" className="sidebar-link">
                Attendance
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "ecom" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("ecom")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-cart-shopping-fast"></i>
            </span>{" "}
            <span className="sidebar-txt">eCommerce</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "ecom" ? "show" : ""
            }`}
            id="ecommerceDropdown"
          >
            <li className="sidebar-dropdown-item">
              <Link href="/all-customer" className="sidebar-link">
                All Customer
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/add-new-product" className="sidebar-link">
                Add Product
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/all-product" className="sidebar-link">
                All Product
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/category" className="sidebar-link">
                Category
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/order" className="sidebar-link">
                Order
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/calendar" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-calendar"></i>
            </span>{" "}
            <span className="sidebar-txt">Calendar</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/chat" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-messages"></i>
            </span>{" "}
            <span className="sidebar-txt">Chat</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/email" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-envelope"></i>
            </span>{" "}
            <span className="sidebar-txt">Email</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/invoices" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-file-invoice"></i>
            </span>{" "}
            <span className="sidebar-txt">Invoices</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/contacts" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-user-plus"></i>
            </span>{" "}
            <span className="sidebar-txt">Contacts</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default AppsPart;
