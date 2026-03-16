"use client";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";

const PagesPart = () => {
  const {
    toggleMainSidebarDropdown,
    mainSidebarDropdown,
    openSubMenu,
    toggleSubMenu,
    mainRef,
  } = useDigiContext();

  return (
    <li className="sidebar-item">
      <a
        role="button"
        className={`sidebar-link-group-title has-sub ${
          mainSidebarDropdown.includes("pages") ? "show" : ""
        }`}
        onClick={() => toggleMainSidebarDropdown("pages")}
      >
        Pages
      </a>
      <ul
        className={`sidebar-link-group ${
          mainSidebarDropdown.includes("pages") ? "show" : ""
        }`}
      >
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "auth" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("auth")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user-cog"></i>
            </span>{" "}
            <span className="sidebar-txt">Authentication</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "auth" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="/login" className="sidebar-link">
                Login 01
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/login-2" className="sidebar-link">
                Login 02
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/login-3" className="sidebar-link">
                Login 03
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/registration" className="sidebar-link">
                Registration 01
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/registration-2" className="sidebar-link">
                Registration 02
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/reset-password" className="sidebar-link">
                Reset Password
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/update-password" className="sidebar-link">
                Update Password
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/login-status" className="sidebar-link">
                Login Status
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "err" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("err")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-triangle-exclamation"></i>
            </span>{" "}
            <span className="sidebar-txt">Error</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "err" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="/error-400" className="sidebar-link">
                Error 400
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-403" className="sidebar-link">
                Error 403
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-404" className="sidebar-link">
                Error 404
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-408" className="sidebar-link">
                Error 408
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-500" className="sidebar-link">
                Error 500
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-503" className="sidebar-link">
                Error 503
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/error-504" className="sidebar-link">
                Error 504
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "user" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("user")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-user"></i>
            </span>{" "}
            <span className="sidebar-txt">User</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "user" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="/view-profile" className="sidebar-link">
                View Profile
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/edit-profile" className="sidebar-link">
                Edit Profile
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <a
            role="button"
            className={`sidebar-link has-sub ${
              openSubMenu === "aditional" ? "show" : ""
            }`}
            onClick={() => toggleSubMenu("aditional")}
          >
            <span className="nav-icon">
              <i className="fa-light fa-square-plus"></i>
            </span>{" "}
            <span className="sidebar-txt">Additional</span>
          </a>
          <ul
            className={`sidebar-dropdown-menu ${
              openSubMenu === "aditional" ? "show" : ""
            }`}
          >
            <li className="sidebar-dropdown-item">
              <Link href="/coming-soon" className="sidebar-link">
                Coming Soon 01
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/coming-soon-2" className="sidebar-link">
                Coming Soon 02
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/pricing-table" className="sidebar-link">
                Pricing Table 01
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/pricing-table-2" className="sidebar-link">
                Pricing Table 02
              </Link>
            </li>
            <li className="sidebar-dropdown-item">
              <Link href="/under-construction" className="sidebar-link">
                Under Construction
              </Link>
            </li>
          </ul>
        </li>
        <li className="sidebar-dropdown-item">
          <Link href="/utility" className="sidebar-link">
            <span className="nav-icon">
              <i className="fa-light fa-layer-group"></i>
            </span>{" "}
            <span className="sidebar-txt">Utility</span>
          </Link>
        </li>
      </ul>
    </li>
  );
};

export default PagesPart;
