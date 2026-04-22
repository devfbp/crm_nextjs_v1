"use client";
import Link from "next/link";
import React, { useState } from "react";
import HeaderChat from "./HeaderChat";
import HeaderNotification from "./HeaderNotification";
import Calculator from "./Calculator";
import HeaderProfile from "./HeaderProfile";
import { useDigiContext } from "@/context/DigiContext";
import { navigatePage } from "@/component/utils/common";

const HeaderSection = () => {  
  const {
    themeQuickToggle,
    toggleScreenSize,
    currentTheme,
    isFullscreen,
    navQuickToggle,
    mainHeaderRef,
    openSettings,
  } = useDigiContext();

  const [mobileHeader, setMobileHeader] = useState<boolean>(false);

  const toggleMobileHeader = () => {
    setMobileHeader(!mobileHeader);
  };

  const loadHomepage = () => {
    navigatePage("/");
  }

  return (
    <div
      className={`header ${mobileHeader ? "expanded-in-mobile" : ""}`}
      id="MainHeader"
      ref={mainHeaderRef}
    >
      <div className="row g-0 align-items-center">
        <div className="col-xxl-6 col-xl-5 col-4 d-flex align-items-center gap-20">
          <div className="main-logo d-lg-block d-none">
            <div className="logo-big">
              <Link href="/" onClick={loadHomepage}>
                <img
                  src={`${
                    currentTheme === "light"
                      ? "/assets/images/logo-black.png"
                      : "/assets/images/logo-big2.png"
                  }`}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="logo-small">
              <Link href="/">
                <img src="assets/images/logo-small.png" alt="Logo" />
              </Link>
            </div>
          </div>
          <div className="nav-close-btn">
            <button onClick={navQuickToggle}>
              <i className="fa-light fa-bars-sort"></i>
            </button>
          </div>
          {/* <Link
            href={process.env.NEXT_PUBLIC_WEBSITE_URL || "/"}
            target="_blank"
            className="btn btn-sm btn-primary site-view-btn"
          >
            <i className="fa-light fa-globe me-1"></i> <span>View Website</span>
          </Link> */}
        </div>
        <div className="col-4 d-lg-none">
          <div className="mobile-logo">
            <Link href="/">
              <img
                src={`${
                  currentTheme === "light"
                    ? "/assets/images/logo-black.png"
                    : "/assets/images/logo-big2.png"
                }`}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-7 col-lg-8 col-4">
          <div className="header-right-btns d-flex justify-content-end align-items-center">
            <div
              className={`header-collapse-group ${
                mobileHeader ? "d-block" : ""
              }`}
            >
              <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                {/* <form className="header-form">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    required
                  />
                  <button type="submit">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </form> */}
                <div className="header-right-btns d-flex justify-content-end align-items-center p-0">
                  {/* <div className="lang-select">
                    <span>Language:</span>
                    <select>
                      <option value="">EN</option>
                      <option value="">BN</option>
                      <option value="">FR</option>
                    </select>
                  </div> */}
                  {/* <HeaderChat /> */}
                  <HeaderNotification />
                  <Calculator />
                  <button
                    className="header-btn fullscreen-btn"
                    id="btnFullscreen"
                    onClick={toggleScreenSize}
                  >
                    <i
                      className={`fa-light ${
                        isFullscreen ? "fa-compress" : "fa-expand"
                      }`}
                    ></i>
                  </button>
                  <button
                    className="header-btn theme-color-btn"
                    onClick={themeQuickToggle}
                  >
                    <i
                      className={`fa-light ${
                        currentTheme === "light"
                          ? "fa-cloud-moon"
                          : "fa-sun-bright"
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>
            <button
              className="header-btn header-collapse-group-btn d-lg-none"
              onClick={toggleMobileHeader}
            >
              <i className="fa-light fa-ellipsis-vertical"></i>
            </button>
            <button
              className="header-btn theme-settings-btn d-lg-none"
              onClick={openSettings}
            >
              <i className="fa-light fa-gear"></i>
            </button>
            <HeaderProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
