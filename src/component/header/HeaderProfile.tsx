"use client";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";
import { getUserSessionData } from "../utils/common";
import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import "./HeaderProfile.scss";

const HeaderProfile = () => {
  const [sessionDataString, setSessionDataString] = useState<any>(null);
  const logout = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'logout', {
        method: 'POST',
        credentials: 'include',
      })
      if (res.ok) {
        window.location.href = '/login'
      }
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }
  useEffect(() => {
    //console.log("sessionDataString in header profile", sessionDataString);
    const data = getUserSessionData();
    setSessionDataString(data);
  }, []);
  const {
    headerDropdownRef,
    headerDropdownShow,
    toggleHeaderDropdown,
    headerSidebarShow,
    handleCheckboxChange,
  } = useDigiContext();
  const uname = sessionDataString?.user_name
  ?.split(' ')[0]
  ?.substring(0, 20);
  return (
    <div className="header-btn-box" ref={headerDropdownRef}>
      <div className="profile-btn-wrapper">
        <button
          className={`profile-btn ${headerDropdownShow ? "show" : ""}`}
          id="profileDropdown"
          onClick={toggleHeaderDropdown}
        >
          <div><Avatar name={sessionDataString?.user_name?.toUpperCase()} size="30" /></div>
          <div className="d-none d-lg-block">{uname}</div>
        </button>
        <ul
          className={`dropdown-menu ${headerDropdownShow ? "show" : ""}`}
          aria-labelledby="profileDropdown"
        >
          <li>
            <div className="dropdown-txt text-center ">
              <p className="mb-0 text-info">{sessionDataString?.user_name?.toUpperCase()}</p>
              <span className="d-block text-warning">{sessionDataString?.role_name}</span>
              {/* <div className="d-flex justify-content-center">
                <div className="form-check pt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="seeProfileAsSidebar"
                    checked={headerSidebarShow}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="seeProfileAsSidebar"
                  >
                    See as sidebar
                  </label>
                </div>
              </div> */}
            </div>
          </li>
          <li>
            <Link className="dropdown-item" href="/profile">
              <span className="dropdown-icon">
                <i className="fa-regular fa-circle-user"></i>
              </span>{" "}
              Profile
            </Link>
            <Link className="dropdown-item" href={`/user/${sessionDataString?.user_id}/change-password`}>
              <span className="dropdown-icon">
                <i className="fa-regular fa-circle-user"></i>
              </span>{" "}
              Change Password
            </Link>
          </li>
          {/* <li>
            <Link className="dropdown-item" href="/chat">
              <span className="dropdown-icon">
                <i className="fa-regular fa-message-lines"></i>
              </span>{" "}
              Message
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="/task">
              <span className="dropdown-icon">
                <i className="fa-regular fa-calendar-check"></i>
              </span>{" "}
              Taskboard
            </Link>
          </li>
          <li>
            <Link className="dropdown-item" href="#">
              <span className="dropdown-icon">
                <i className="fa-regular fa-circle-question"></i>
              </span>{" "}
              Help
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item" href="/editProfile">
              <span className="dropdown-icon">
                <i className="fa-regular fa-gear"></i>
              </span>{" "}
              Settings
            </Link>
          </li> */}
          <li>
            <Link className="dropdown-item" onClick={logout} href="#">
              <span className="dropdown-icon">
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
              </span>{" "}
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderProfile;
