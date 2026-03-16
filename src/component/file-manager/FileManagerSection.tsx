"use client";
import React, { useState } from "react";
import { Tab } from "react-bootstrap";
import AllFileSection from "./AllFileSection";
import RecentFileSection from "./RecentFileSection";
import FileTabPanes from "./FileTabPanes";
import StarredFileSection from "./StarredFileSection";
import FileCategoryStatus from "./FileCategoryStatus";
import FileManagerNav from "./FileManagerNav";
import SettingSection from "./SettingSection";
import { useDigiContext } from "@/context/DigiContext";

const FileManagerSection = () => {
  const {
    handleUploadModalShow,
    mobileFileManagerBtn,
    handleMobileFileManagerBtn,
    fileManagerRef,
  } = useDigiContext();
  const [activeTab, setActiveTab] = useState<string>("all-files");

  const handleTabChange = (tab: string | null) => {
    setActiveTab(tab ?? "all-files");
  };
  return (
    <div className="main-mobile-file-manager row g-4 position-relative">
      <div
        className={`col-xxl-2 col-lg-3 file-manager-sidebar-col ${
          mobileFileManagerBtn ? "d-block" : ""
        }`}
      >
        <div className="file-manager-sidebar" ref={fileManagerRef}>
          <div className="panel mb-30">
            <div className="panel-body">
              <div className="d-flex gap-1">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleUploadModalShow}
                >
                  <i className="fa-regular fa-plus"></i> Upload File
                </button>
                <button
                  className="btn btn-icon btn-primary close-file-manager-menu-btn d-lg-none"
                  onClick={handleMobileFileManagerBtn}
                >
                  <i className="fa-light fa-bars"></i>
                </button>
              </div>
              <FileManagerNav
                activeTab={activeTab}
                handleTabChange={handleTabChange}
              />
              <div className="divider-dash"></div>
              <FileCategoryStatus />
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <div className="storage-status">
                <div className="progress-txt">
                  <div className="file-category-name">
                    <span>
                      <i className="fa-light fa-hard-drive"></i>
                    </span>
                    <p>Total Storage</p>
                  </div>
                </div>
                <div className="progress-stacked">
                  <div className="progress" style={{ width: "15%" }}>
                    <div className="progress-bar bg-success"></div>
                  </div>
                  <div className="progress" style={{ width: "15%" }}>
                    <div className="progress-bar bg-danger"></div>
                  </div>
                  <div className="progress" style={{ width: "20%" }}>
                    <div className="progress-bar bg-primary"></div>
                  </div>
                  <div className="progress" style={{ width: "15%" }}>
                    <div className="progress-bar bg-warning"></div>
                  </div>
                  <div className="progress" style={{ width: "5%" }}>
                    <div className="progress-bar bg-info"></div>
                  </div>
                  <div className="progress" style={{ width: "10%" }}>
                    <div className="progress-bar bg-secondary"></div>
                  </div>
                </div>
                <p>13 GB of 15 GB Available </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xxl-10 col-lg-9">
        <Tab.Content>
          <Tab.Pane
            eventKey="all-files"
            className={`tab-pane ${
              activeTab === "all-files" ? "show active" : ""
            }`}
          >
            <AllFileSection />
            <RecentFileSection state={false} />
          </Tab.Pane>
          <Tab.Pane
            eventKey="shared"
            className={`tab-pane ${
              activeTab === "shared" ? "show active" : ""
            }`}
          >
            <FileTabPanes state={true} title={"Shared Files"} />
          </Tab.Pane>
          <Tab.Pane
            eventKey="recent"
            className={`tab-pane ${
              activeTab === "recent" ? "show active" : ""
            }`}
          >
            <FileTabPanes state={true} title={"Recent Files"} />
          </Tab.Pane>
          <Tab.Pane
            eventKey="starred"
            className={`tab-pane ${
              activeTab === "starred" ? "show active" : ""
            }`}
          >
            <StarredFileSection />
          </Tab.Pane>
          <Tab.Pane
            eventKey="trash"
            className={`tab-pane ${activeTab === "trash" ? "show active" : ""}`}
          >
            <FileTabPanes state={true} title={"Trash Files"} />
          </Tab.Pane>
          <Tab.Pane
            eventKey="setting"
            className={`tab-pane ${
              activeTab === "setting" ? "show active" : ""
            }`}
          >
            <SettingSection />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </div>
  );
};

export default FileManagerSection;
