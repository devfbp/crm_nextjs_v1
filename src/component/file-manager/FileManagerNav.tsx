import Link from "next/link";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
type Props = {
  activeTab: string;
  handleTabChange: (tab: string | null) => void;
};
const FileManagerNav = ({ activeTab, handleTabChange }: Props) => {
  return (
    <Nav
      variant="tabs"
      activeKey={activeTab}
      onSelect={handleTabChange}
      className="btn-box"
    >
      <Nav.Item style={{ width: "100%" }}>
        <Nav.Link
          eventKey="all-files"
          className={`file-manager-tab-btn w-100 all-files-tab ${
            activeTab === "all-files" ? "active" : ""
          }`}
        >
          All Files
        </Nav.Link>
      </Nav.Item>
      <div className="divider-dash"></div>
      <ul className="connected-app">
        <li className="file-manager-sidebar-title">Connected Apps</li>
        <li>
          <Link href="https://drive.google.com/">
            <span className="text-warning">
              <i className="fa-brands fa-google-drive"></i>
            </span>{" "}
            Google Drive
          </Link>
        </li>
        <li>
          <Link href="https://www.dropbox.com">
            <span className="text-info">
              <i className="fa-brands fa-dropbox"></i>
            </span>{" "}
            Dropbox
          </Link>
        </li>
      </ul>
      <div className="divider-dash"></div>
      <div className="other-files">
        <Nav.Item>
          <Nav.Link
            eventKey="shared"
            className={`file-manager-tab-btn w-100 ${
              activeTab === "shared" ? "active" : ""
            }`}
          >
            <span>
              <i className="fa-light fa-share-nodes"></i>
            </span>{" "}
            Shared Files
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="recent"
            className={`file-manager-tab-btn w-100 ${
              activeTab === "recent" ? "active" : ""
            }`}
          >
            <span>
              <i className="fa-light fa-clock"></i>
            </span>{" "}
            Recent Files
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="starred"
            className={`file-manager-tab-btn w-100 ${
              activeTab === "starred" ? "active" : ""
            }`}
          >
            <span>
              <i className="fa-light fa-star"></i>
            </span>{" "}
            Starred
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="trash"
            className={`file-manager-tab-btn w-100 ${
              activeTab === "trash" ? "active" : ""
            }`}
          >
            <span>
              <i className="fa-light fa-trash"></i>
            </span>{" "}
            Trash
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="setting"
            className={`file-manager-tab-btn w-100 ${
              activeTab === "setting" ? "active" : ""
            }`}
          >
            <span>
              <i className="fa-light fa-gear"></i>
            </span>{" "}
            Settings
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default FileManagerNav;
