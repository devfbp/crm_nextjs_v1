"use client";
import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import NavPositionSection from "./right-sidebar/NavPositionSection";
import LayoutDirection from "./right-sidebar/LayoutDirection";
import MainBackgroundSection from "./right-sidebar/MainBackgroundSection";
import NavSizeSection from "./right-sidebar/NavSizeSection";
import PrimaryColorSection from "./right-sidebar/PrimaryColorSection";
import ThemeColorSection from "./right-sidebar/ThemeColorSection";
import SidebarBackgroundSection from "./right-sidebar/SidebarBackgroundSection";
import { useDigiContext } from "@/context/DigiContext";

const RightSidebar = () => {
  const { isSettingsOpen, settingsRef, closeSettings, layout } =
    useDigiContext();
  const showNavSizeSection = layout === "horizontal" || layout === "two-column";
  return (
    <div
      className={`right-sidebar ${isSettingsOpen ? "active" : ""}`}
      ref={settingsRef}
    >
      <button className="right-bar-close" onClick={closeSettings}>
        <i className="fa-light fa-angle-right"></i>
      </button>
      <div className="sidebar-title">
        <h3>Layout Settings</h3>
      </div>
      <OverlayScrollbarsComponent className="sidebar-body">
        <NavPositionSection />
        <LayoutDirection />
        <PrimaryColorSection />
        <ThemeColorSection />
        {!showNavSizeSection && <NavSizeSection />}
        <SidebarBackgroundSection />
        <MainBackgroundSection />
      </OverlayScrollbarsComponent>
    </div>
  );
};

export default RightSidebar;
