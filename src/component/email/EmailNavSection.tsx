import React from "react";
import { Nav } from "react-bootstrap";
type Props = {
  activeTab: string;
  handleTabChange: (tab: string | null) => void;
};
const EmailNavSection = ({ activeTab, handleTabChange }: Props) => {
  return (
    <div className="emial-menu-list">
      <div className="scrollable">
        <Nav
          className="email-nav-section"
          variant="tabs"
          activeKey={activeTab}
          onSelect={handleTabChange}
        >
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="inbox"
              className={`mail-nav btn-flush ${
                activeTab === "inbox" ? "active" : ""
              }`}
            >
              <span className="badge bg-danger">9+</span>
              <span className="part-icon">
                <i className="fa-light fa-inbox"></i>
              </span>
              <span className="part-txt">Inbox</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="starred"
              className={`mail-nav btn-flush ${
                activeTab === "starred" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-star"></i>
              </span>
              <span className="part-txt">Starred</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="trash"
              className={`mail-nav btn-flush ${
                activeTab === "trash" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-trash-can"></i>
              </span>
              <span className="part-txt">Trash</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="sent"
              className={`mail-nav btn-flush ${
                activeTab === "sent" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-paper-plane-top"></i>
              </span>
              <span className="part-txt">Sent</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="draft"
              className={`mail-nav btn-flush ${
                activeTab === "draft" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-file"></i>
              </span>
              <span className="part-txt">Draft</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="all-email"
              className={`mail-nav btn-flush ${
                activeTab === "all-email" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-envelopes"></i>
              </span>
              <span className="part-txt">All Email</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="spam"
              className={`mail-nav btn-flush ${
                activeTab === "spam" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-hexagon-exclamation"></i>
              </span>
              <span className="part-txt">Spam</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="email-nav-item">
            <Nav.Link
              eventKey="important"
              className={`mail-nav btn-flush ${
                activeTab === "important" ? "active" : ""
              }`}
            >
              <span className="part-icon">
                <i className="fa-light fa-ribbon"></i>
              </span>
              <span className="part-txt">Important</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
};

export default EmailNavSection;
