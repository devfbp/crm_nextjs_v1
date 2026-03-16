"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";

const NavSizeSection = () => {
  const { currentNav, toggleNav } = useDigiContext();
  const [openLayoutSettings, setOpenLayoutSettings] = useState(true);
  const toggleLayoutSettings = () => {
    setOpenLayoutSettings((prev) => !prev);
  };
  return (
    <div className="right-sidebar-group" id="navBarSizeGroup">
      <span className="sidebar-subtitle">
        Navbar Size{" "}
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
      <div className={`settings-row ${openLayoutSettings ? "show" : "hide"}`}>
        <div className="settings-col">
          <div
            className={`dashboard-icon d-flex gap-1 border rounded ${
              currentNav === "default-nav" ? "active" : ""
            }`}
            id="sidebarDefault"
            role="button"
            onClick={() => toggleNav("default-nav")}
          >
            <div className="pb-4 px-1 pt-1 bg-menu">
              <div className="px-2 py-1 rounded-pill bg-nav mb-2"></div>
              <div className="px-2 pt-1 bg-nav mb-1"></div>
              <div className="px-2 pt-1 bg-nav mb-1"></div>
              <div className="px-2 pt-1 bg-nav mb-1"></div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
              <div className="px-2 py-1 bg-menu"></div>
              <div className="px-2 py-1 bg-menu"></div>
            </div>
            <span className="part-txt">Default</span>
          </div>
        </div>
        <div className="settings-col">
          <div
            className={`dashboard-icon d-flex gap-1 border rounded ${
              currentNav === "small-nav" ? "active" : ""
            }`}
            id="sidebarSmall"
            role="button"
            onClick={() => toggleNav("small-nav")}
          >
            <div className="pb-4 pt-1 bg-menu">
              <div className="p-1 rounded-pill bg-nav mb-2"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
              <div className="px-2 py-1 bg-menu"></div>
              <div className="px-2 py-1 bg-menu"></div>
            </div>
            <span className="part-txt">Small icon</span>
          </div>
        </div>
        <div className="settings-col">
          <div
            className={`dashboard-icon d-flex gap-1 border rounded ${
              currentNav === "hover-nav" || currentNav === "not-hovered"
                ? "active"
                : ""
            }`}
            id="hover"
            role="button"
            onClick={() => toggleNav("hover-nav")}
          >
            <div className="pb-4 pt-1 bg-menu">
              <div className="p-1 rounded-pill bg-nav mb-2"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
              <div className="ps-1 pt-1 bg-nav mb-1"></div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
              <div className="px-2 py-1 bg-menu"></div>
              <div className="px-2 py-1 bg-menu"></div>
            </div>
            <span className="part-txt">Expand on hover</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSizeSection;
