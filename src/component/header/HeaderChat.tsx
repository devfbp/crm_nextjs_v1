"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const HeaderChat = () => {
  // chat functions
  const chatRef = useRef<HTMLDivElement>(null); // Ref for the chat dropdown
  const [chatShow, setChatShow] = useState(false);

  const toggleChat = () => setChatShow((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setChatShow(false);
      }
    };

    // Attach and clean up event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="header-btn-box" ref={chatRef}>
      <button
        className={`header-btn
        ${chatShow ? "show" : ""}`}
        id="messageDropdown"
        onClick={toggleChat}
      >
        <i className="fa-light fa-comment-dots"></i>
        <span className="badge bg-danger">3</span>
      </button>
      <ul
        className={`message-dropdown dropdown-menu ${chatShow ? "show" : ""}`}
      >
        <li>
          <Link href="#" className="d-flex">
            <div className="avatar">
              <img src="assets/images/avatar.png" alt="image" />
            </div>
            <div className="msg-txt">
              <span className="name">Archer Cowie</span>
              <span className="msg-short">
                There are many variations of passages of Lorem Ipsum.
              </span>
              <span className="time">2 Hours ago</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex">
            <div className="avatar">
              <img src="assets/images/avatar-2.png" alt="image" />
            </div>
            <div className="msg-txt">
              <span className="name">Cody Rodway</span>
              <span className="msg-short">
                There are many variations of passages of Lorem Ipsum.
              </span>
              <span className="time">2 Hours ago</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="#" className="d-flex">
            <div className="avatar">
              <img src="assets/images/avatar-3.png" alt="image" />
            </div>
            <div className="msg-txt">
              <span className="name">Zane Bain</span>
              <span className="msg-short">
                There are many variations of passages of Lorem Ipsum.
              </span>
              <span className="time">2 Hours ago</span>
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

export default HeaderChat;
