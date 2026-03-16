"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";

const SidebarBackgroundSection = () => {
  const { toggleSidebarBackground, sidebarBackgroundImg } = useDigiContext();
  const [openLayoutSettings, setOpenLayoutSettings] = useState(true);
  const toggleLayoutSettings = () => {
    setOpenLayoutSettings((prev) => !prev);
  };

  return (
    <div className="right-sidebar-group">
      <span className="sidebar-subtitle">
        Sidebar Background
        <span>
          <i
            className={`fa-light ${
              openLayoutSettings ? "fa-angle-up" : "fa-angle-down"
            }`}
            role="button"
            onClick={toggleLayoutSettings}
          ></i>
        </span>
      </span>
      <div>
        <div
          className={`sidebar-bg-btn-box ${
            openLayoutSettings ? "show" : "hide"
          }`}
        >
          <button id="noBackground" onClick={() => toggleSidebarBackground("")}>
            <span>
              <i className="fa-light fa-xmark"></i>
            </span>
          </button>
          <button
            className={`sidebar-bg-btn ${
              sidebarBackgroundImg === "assets/images/nav-bg-1.jpg"
                ? "active"
                : ""
            }`}
            onClick={() =>
              toggleSidebarBackground("assets/images/nav-bg-1.jpg")
            }
          >
            <img src="assets/images/nav-bg-1.jpg" height={90} width={50} />
          </button>
          <button
            className={`sidebar-bg-btn ${
              sidebarBackgroundImg === "assets/images/nav-bg-2.jpg"
                ? "active"
                : ""
            }`}
            onClick={() =>
              toggleSidebarBackground("assets/images/nav-bg-2.jpg")
            }
          >
            <img src="assets/images/nav-bg-2.jpg" height={90} width={50} />
          </button>
          <button
            className={`sidebar-bg-btn ${
              sidebarBackgroundImg === "assets/images/nav-bg-3.jpg"
                ? "active"
                : ""
            }`}
            onClick={() =>
              toggleSidebarBackground("assets/images/nav-bg-3.jpg")
            }
          >
            <img src="assets/images/nav-bg-3.jpg" height={90} width={50} />
          </button>
          <button
            className={`sidebar-bg-btn ${
              sidebarBackgroundImg === "assets/images/nav-bg-4.jpg"
                ? "active"
                : ""
            }`}
            onClick={() =>
              toggleSidebarBackground("assets/images/nav-bg-4.jpg")
            }
          >
            <img src="assets/images/nav-bg-4.jpg" height={90} width={50} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarBackgroundSection;
