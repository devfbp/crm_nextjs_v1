"use client";
import React, { useState } from "react";
import { useDigiContext } from "@/context/DigiContext";
import EmailTabContent from "./EmailTabContent";
import EmailNavSection from "./EmailNavSection";

const EmailSection = () => {
  const {
    handleComposeMailOpen,
    mobileEmailBtn,
    emailRef,
    handleMobileEmailBtn,
  } = useDigiContext();
  const [activeTab, setActiveTab] = useState<string>("inbox");

  const handleTabChange = (tab: string | null) => {
    if (tab !== null) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="email-panel d-flex rounded">
      <div
        className={`panel rounded-0 border-end ${
          mobileEmailBtn ? "d-block" : ""
        }`}
      >
        <div className="panel-body email-menu" ref={emailRef}>
          <div className="btn-box d-flex gap-1 mb-20">
            <button
              className="btn btn-primary w-100 compose-mail-btn"
              onClick={handleComposeMailOpen}
            >
              <i className="fa-light fa-pen-to-square"></i> Compose
            </button>
            <button
              className="btn btn-icon btn-primary close-mail-menu-btn d-lg-none"
              onClick={handleMobileEmailBtn}
            >
              <i className="fa-light fa-bars"></i>
            </button>
          </div>
          <EmailNavSection
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
        </div>
      </div>
      <EmailTabContent activeTab={activeTab} />
    </div>
  );
};

export default EmailSection;
