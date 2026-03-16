"use client";
import React, { useEffect, useState } from "react";

const PrimaryColorSection = () => {
  const colorList = [
    { id: 1, color: "blue" },
    { id: 2, color: "orange" },
    { id: 3, color: "pink" },
    { id: 4, color: "eagle_green" },
    { id: 5, color: "purple" },
    { id: 6, color: "gold" },
    { id: 7, color: "green" },
    { id: 8, color: "deep_pink" },
    { id: 9, color: "tea_green" },
    { id: 10, color: "yellow_green" },
  ];

  const [openColorSettings, setOpenColorSettings] = useState(true);
  const toggleColorSettings = () => {
    setOpenColorSettings((prev) => !prev);
  };

  const [selectedColor, setSelectedColor] = useState("blue");

  const toggleColor = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    if (selectedColor) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = `/assets/css/${selectedColor}-color.css`;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [selectedColor]);

  return (
    <div className="right-sidebar-group">
      <span className="sidebar-subtitle">
        Primary Color{" "}
        <span>
          <i
            className={`fa-light ${
              openColorSettings ? "fa-angle-up" : "fa-angle-down"
            }`}
            role="button"
            onClick={toggleColorSettings}
          ></i>
        </span>
      </span>
      <div className={`settings-row-2 ${openColorSettings ? "show" : "hide"}`}>
        {colorList.map((color) => (
          <button
            key={color.id}
            className={`color-palette color-palette-${color.id} ${
              selectedColor === color.color ? "active" : ""
            }`}
            onClick={() => toggleColor(color.color)}
          >
            {[...Array(4)].map((_, index) => (
              <span key={index}></span>
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrimaryColorSection;
