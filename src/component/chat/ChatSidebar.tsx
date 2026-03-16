"use client";
import React from "react";
import Link from "next/link";
import { useDigiContext } from "@/context/DigiContext";

const ChatSidebar = () => {
  const { handleShowVoiceCall, handleShowVideoCall, toggleSearchOpen } =
    useDigiContext();
  return (
    <div className="panel border-start rounded-0 closed">
      <div className="panel-body border-bottom">
        <div className="user-short">
          <button className="back-to-chat-btn btn-flush fs-14 d-xxl-none">
            <i className="fa-light fa-arrow-left"></i>
          </button>
          <div className="avatar avatar-lg">
            <img src="assets/images/avatar-2.png" alt="Image" />
          </div>
          <div className="part-txt">
            <span className="user-name">Amelie Harris</span>
            <span className="user-mail">example@info.com</span>
          </div>
          <div className="user-option">
            <button
              className="btn btn-icon btn-outline-primary"
              onClick={handleShowVoiceCall}
            >
              <i className="fa-light fa-phone"></i>
            </button>
            <button
              className="btn btn-icon btn-outline-primary"
              onClick={handleShowVideoCall}
            >
              <i className="fa-light fa-video"></i>
            </button>
            <button
              className="btn btn-icon btn-outline-primary"
              onClick={toggleSearchOpen}
              id="searchMsg"
            >
              <i className="fa-light fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="panel-body">
        <div className="scrollable">
          <div className="chatting-option mb-20">
            <ul>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-photo-film"></i>
                  </span>
                  Media
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-file-lines"></i>
                  </span>
                  Files
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-link"></i>
                  </span>
                  Links
                </Link>
              </li>
            </ul>
          </div>
          <div className="chatting-option">
            <ul>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-bell-slash"></i>
                  </span>
                  Mute notification
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-message-slash"></i>
                  </span>
                  Ignore message
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span>
                    <i className="fa-light fa-circle-minus"></i>
                  </span>
                  Block user
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
