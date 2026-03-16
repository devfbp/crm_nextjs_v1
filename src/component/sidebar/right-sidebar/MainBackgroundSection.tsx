"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useState } from "react";

const MainBackgroundSection = () => {
  const { mainBackgroundImg, toggleMainBackground } = useDigiContext();
  const [openLayoutSettings, setOpenLayoutSettings] = useState(true);
  const toggleLayoutSettings = () => {
    setOpenLayoutSettings((prev) => !prev);
  };

  return (
    <div className="right-sidebar-group">
      <span className="sidebar-subtitle">
        Main Background{" "}
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
          className={`main-content-bg-btn-box ${
            openLayoutSettings ? "show" : "hide"
          }`}
        >
          <button id="noBackground2" onClick={() => toggleMainBackground("")}>
            <span>
              <i className="fa-light fa-xmark"></i>
            </span>
          </button>
          <button
            className={`main-content-bg-btn ${
              mainBackgroundImg === "assets/images/main-bg-1.jpg"
                ? "active"
                : ""
            }`}
            onClick={() => toggleMainBackground("assets/images/main-bg-1.jpg")}
          >
            <img
              src="assets/images/main-bg-1.jpg"
              height={60}
              width={100}
              alt="Background 1"
            />
          </button>
          <button
            className={`main-content-bg-btn ${
              mainBackgroundImg === "assets/images/main-bg-2.jpg"
                ? "active"
                : ""
            }`}
            onClick={() => toggleMainBackground("assets/images/main-bg-2.jpg")}
          >
            <img
              src="assets/images/main-bg-2.jpg"
              height={60}
              width={100}
              alt="Background 2"
            />
          </button>
          <button
            className={`main-content-bg-btn ${
              mainBackgroundImg === "assets/images/main-bg-3.jpg"
                ? "active"
                : ""
            }`}
            onClick={() => toggleMainBackground("assets/images/main-bg-3.jpg")}
          >
            <img
              src="assets/images/main-bg-3.jpg"
              height={60}
              width={100}
              alt="Background 3"
            />
          </button>
          <button
            className={`main-content-bg-btn ${
              mainBackgroundImg === "assets/images/main-bg-4.jpg"
                ? "active"
                : ""
            }`}
            onClick={() => toggleMainBackground("assets/images/main-bg-4.jpg")}
          >
            <img
              src="assets/images/main-bg-4.jpg"
              height={60}
              width={100}
              alt="Background 4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBackgroundSection;
