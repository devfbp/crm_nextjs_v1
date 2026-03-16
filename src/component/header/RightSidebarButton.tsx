"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
const RightSidebarButton = () => {
  const { openSettings } = useDigiContext();
  return (
    <div className="right-sidebar-btn d-lg-block d-none">
      <button className="header-btn theme-settings-btn" onClick={openSettings}>
        <i className="fa-light fa-gear"></i>
      </button>
    </div>
  );
};

export default RightSidebarButton;
