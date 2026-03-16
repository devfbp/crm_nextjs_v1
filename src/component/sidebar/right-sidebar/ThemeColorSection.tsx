"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";

const ThemeColorSection = () => {
  const { currentTheme, toggleTheme } = useDigiContext();
  const [openLayoutSettings, setOpenLayoutSettings] = useState(true);
  const toggleLayoutSettings = () => {
    setOpenLayoutSettings((prev) => !prev);
  };

  return (
    <div className="right-sidebar-group">
      <span className="sidebar-subtitle">
        Theme Color{" "}
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
            className={`dashboard-icon d-flex bg-blue-theme gap-1 border rounded ${
              currentTheme === "blue" ? "active" : ""
            }`}
            role="button"
            onClick={() => toggleTheme("blue")}
            id="blueTheme"
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
            <span className="part-txt">Blue Theme</span>
          </div>
        </div>
        <div className="settings-col">
          <div
            className={`dashboard-icon d-flex gap-1 border rounded bg-body-secondary light-theme-btn ${
              currentTheme === "light" ? "active" : ""
            }`}
            role="button"
            onClick={() => toggleTheme("light")}
            id="lightTheme"
          >
            <div className="pb-4 px-1 pt-1 bg-dark-subtle">
              <div className="px-2 py-1 rounded-pill bg-primary mb-2"></div>
              <div className="px-2 pt-1 bg-primary mb-1"></div>
              <div className="px-2 pt-1 bg-primary mb-1"></div>
              <div className="px-2 pt-1 bg-primary mb-1"></div>
            </div>
            <div className="w-100 d-flex flex-column justify-content-between">
              <div className="px-2 py-1 bg-dark-subtle"></div>
              <div className="px-2 py-1 bg-dark-subtle"></div>
            </div>
            <span className="part-txt">Light Theme</span>
          </div>
        </div>
        <div className="settings-col">
          <div
            className={`dashboard-icon d-flex gap-1 border rounded bg-dark ${
              currentTheme === "dark" ? "active" : ""
            }`}
            onClick={() => toggleTheme("dark")}
            id="darkTheme"
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
            <span className="part-txt">Dark Theme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorSection;
