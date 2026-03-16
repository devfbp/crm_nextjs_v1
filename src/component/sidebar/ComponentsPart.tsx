"use client";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";
import { useState } from "react";

const ComponentsPart = () => {
  const {
    toggleMainSidebarDropdown,
    mainSidebarDropdown,
    openSubMenu,
    toggleSubMenu,
    mainRef,
  } = useDigiContext();

  const [nestedMenu, setNestedMenu] = useState({
    firstLvl: false,
    secondLvl: false,
  });

  const toggleSecondLevel = () => {
    setNestedMenu((prevState) => ({
      ...prevState,
      secondLvl: !prevState.secondLvl,
    }));
  };

  return (
    <li className="sidebar-item">
      <a
        role="button"
        className={`sidebar-link-group-title has-sub ${
          mainSidebarDropdown.includes("component") ? "show" : ""
        }`}
        onClick={() => toggleMainSidebarDropdown("component")}
      >
        Components
      </a>
      <ul
        className={`sidebar-link-group ${
          mainSidebarDropdown.includes("component") ? "show" : ""
        } `}
      >
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "advanced" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("advanced")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-layer-group"></i>
            </span>{" "}
            <span className="sidebar-txt">Advance UI</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "advanced" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="/sweet-alert" className="sidebar-link">
                Sweet Alert
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/nestable-list" className="sidebar-link">
                Nestable List
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/animation" className="sidebar-link">
                Animation
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/swiper-slider" className="sidebar-link">
                Swiper Slider
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/form" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-memo-pad"></i>
            </span>{" "}
            <span className="sidebar-txt">Forms</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/table" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-table"></i>
            </span>{" "}
            <span className="sidebar-txt">Tables</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/charts" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-chart-simple"></i>
            </span>{" "}
            <span className="sidebar-txt">Charts</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/icon" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-compass-drafting"></i>
            </span>{" "}
            <span className="sidebar-txt">Icons</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/map" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-location-dot"></i>
            </span>{" "}
            <span className="sidebar-txt">Maps</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/file-manager" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-folder-open"></i>
            </span>{" "}
            <span className="sidebar-txt">File Manager</span>
          </Link>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "multi-lvl" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("multi-lvl")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-layer-group"></i>
            </span>{" "}
            <span className="sidebar-txt">Multiple Level</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "multi-lvl" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="#" className="sidebar-link">
                Level 1
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <a
                role="button"
                className={`sidebar-link has-sub lvl-dropdown-btn ${
                  nestedMenu.firstLvl ? "show" : ""
                }`}
                onClick={() =>
                  setNestedMenu((prevState) => ({
                    ...prevState,
                    firstLvl: !prevState.firstLvl,
                  }))
                }
              >
                Level 1
              </a>
              <ul
                className={`sidebar-dropdown-menu sub-lvl-dropdown ${
                  nestedMenu.firstLvl ? "show" : ""
                }`}
              >
                <li className="sidebar-dropdown-item">
                  <Link href="#" className="sidebar-link">
                    Level 2
                  </Link>
                </li>
                <li className="sidebar-dropdown-item">
                  <a
                    role="button"
                    className={`sidebar-link has-sub lvl-dropdown-btn ${
                      nestedMenu.secondLvl ? "show" : ""
                    }`}
                    onClick={toggleSecondLevel}
                  >
                    Level 2
                  </a>
                  <ul
                    className={`sidebar-dropdown-menu sub-lvl-dropdown ${
                      nestedMenu.secondLvl ? "show" : ""
                    }`}
                  >
                    <li className="sidebar-dropdown-item">
                      <Link href="#" className="sidebar-link">
                        Level 3
                      </Link>
                    </li>
                    <li className="sidebar-dropdown-item">
                      <Link href="#" className="sidebar-link">
                        Level 3
                      </Link>
                    </li>
                    <li className="sidebar-dropdown-item">
                      <Link href="#" className="sidebar-link">
                        Level 3
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="sidebar-dropdown-item">
                  <Link href="#" className="sidebar-link">
                    Level 2
                  </Link>
                </li>
              </ul>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="#" className="sidebar-link">
                Level 1
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  );
};

export default ComponentsPart;
