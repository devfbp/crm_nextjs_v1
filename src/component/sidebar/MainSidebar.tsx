"use client";
import React from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useDigiContext } from "@/context/DigiContext";
import NavigationSection from "./NavigationSection";

const MainSidebar = () => {
  const {
    sidebarBackgroundImg,
    handleHover,
    currentNav,
    sidebarRef,
    layout,
    mainRef,
  } = useDigiContext();

  const shouldUseOverlayScrollbars =
    layout === "horizontal" ||
    layout === "two-column" ||
    layout === "flush" ||
    currentNav !== "small-nav";

  const handleMouseEnter = () => {
    if (currentNav === "not-hovered") {
      handleHover(true);
    }
  };
  const handleMouseLeave = () => {
    if (currentNav === "hover-nav") {
      handleHover(false);
    }
  };
  return (
    <div
      className={`main-sidebar`}
      id="MainSidebar"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundImage: `url(${sidebarBackgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      ref={sidebarRef}
    >
      <div className="main-menu" ref={mainRef}>
        {shouldUseOverlayScrollbars ? (
          <OverlayScrollbarsComponent className="sidebar-menu">
            <NavigationSection />
          </OverlayScrollbarsComponent>
        ) : (
          <NavigationSection />
        )}
      </div>
    </div>
  );
};

export default MainSidebar;
