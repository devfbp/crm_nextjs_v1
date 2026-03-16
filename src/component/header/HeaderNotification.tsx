"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const HeaderNotification = () => {
  // notification functions
  const notificationRef = useRef<HTMLDivElement>(null); // Ref for the notification dropdown
  const [notificationShow, setNotificationShow] = useState(false);

  const toggleNotification = () => setNotificationShow((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationShow(false);
      }
    };

    // Attach and clean up event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  return (
    <div className="header-btn-box" ref={notificationRef}>
      <button
        className={`header-btn ${notificationShow ? "show" : ""}`}
        id="notificationDropdown"
        data-bs-toggle="dropdown"
        onClick={toggleNotification}
      >
        <i className="fa-light fa-bell"></i>
        <span className="badge bg-danger">9+</span>
      </button>
      <ul
        className={`notification-dropdown dropdown-menu ${
          notificationShow ? "show" : ""
        }`}
        aria-labelledby="notificationDropdown"
      >
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon text-primary">
                <i className="fa-solid fa-thumbs-up"></i>
              </span>{" "}
              <span className="fw-bold">Archer</span> Likes your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar-2.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon text-success">
                <i className="fa-solid fa-comment-dots"></i>
              </span>{" "}
              <span className="fw-bold">Cody</span> Commented on your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar-3.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon">
                <i className="fa-solid fa-share"></i>
              </span>{" "}
              <span className="fw-bold">Zane</span> Shared your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar-4.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon text-primary">
                <i className="fa-solid fa-thumbs-up"></i>
              </span>{" "}
              <span className="fw-bold">Christopher</span> Likes your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar-5.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon text-success">
                <i className="fa-solid fa-comment-dots"></i>
              </span>{" "}
              <span className="fw-bold">Charlie</span> Commented on your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex align-items-center">
            <div className="avatar">
              <img src="assets/images/avatar-6.png" alt="image" />
            </div>
            <div className="notification-txt">
              <span className="notification-icon">
                <i className="fa-solid fa-share"></i>
              </span>{" "}
              <span className="fw-bold">Jayden</span> Shared your post
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="show-all-btn">
            Show all message
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HeaderNotification;
