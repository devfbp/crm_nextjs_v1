"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";

const LayoutDirection = () => {
  const { rtlDirection, toggleRtlDirection, toggleLtrDirection } =
    useDigiContext();
  const [openLayoutSettings, setOpenLayoutSettings] = useState(true);
  const toggleLayoutSettings = () => {
    setOpenLayoutSettings((prev) => !prev);
  };
  return (
    <div className="right-sidebar-group">
      <span className="sidebar-subtitle">
        Theme Direction{" "}
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
      <div
        className={`theme-direction-settings-box ${
          openLayoutSettings ? "show" : ""
        }`}
      >
        <div className="btn-group d-flex">
          <button
            className={`btn btn-primary w-50 ${rtlDirection ? "" : "active"}`}
            onClick={toggleLtrDirection}
          >
            LTR
          </button>
          <button
            className={`btn btn-primary w-50 ${rtlDirection ? "active" : ""}`}
            onClick={toggleRtlDirection}
          >
            RTL
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayoutDirection;
