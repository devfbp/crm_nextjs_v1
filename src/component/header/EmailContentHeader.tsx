"use client";
import { useDigiContext } from "@/context/DigiContext";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
type Props = {
  title: string;
};
const EmailContentHeader = ({ title }: Props) => {
  const { emailRef, handleMobileEmailBtn } = useDigiContext();
  const headerRef = useRef(null);

  const [emailHeader, setEmailHeader] = useState(false);

  const handleEmailHeader = () => {
    setEmailHeader((prevState) => !prevState);
  };

  const handleEmailHeaderReset = () => {
    setEmailHeader(false);
  };

  // This function will be called when a click happens outside the component
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !(headerRef.current as any).contains(event.target)
    ) {
      setEmailHeader(false);
    }
  };

  // Use the useEffect hook to attach the event listener on component mount
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="panel-header">
      <div
        className="mobile-email-btn d-flex align-items-center gap-1"
        ref={emailRef}
      >
        <button
          className="btn btn-sm btn-icon btn-primary mail-menu-btn d-lg-none"
          onClick={handleMobileEmailBtn}
        >
          <i className="fa-light fa-bars"></i>
        </button>
        <h5>{title}</h5>
      </div>
      <div className="btn-box d-flex gap-2">
        <div className="tableSearch">
          <Form.Control type="text" placeholder="Search..." />
        </div>
        <button
          className="btn btn-sm btn-icon btn-outline-primary"
          onClick={handleEmailHeaderReset}
        >
          <i className="fa-light fa-arrows-rotate"></i>
        </button>
        <div className="digi-dropdown dropdown" ref={headerRef}>
          <button
            className={`btn btn-sm btn-icon btn-outline-primary ${
              emailHeader ? "show" : ""
            }`}
            onClick={handleEmailHeader}
          >
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </button>
          <ul
            className={`digi-dropdown-menu dropdown-menu ${
              emailHeader ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showSender" />
                <label className="form-check-label" htmlFor="showSender">
                  Sender
                </label>
              </div>
            </li>
            <li>
              <div className="form-check">
                <Form.Check type="checkbox" id="showSubject" />
                <label className="form-check-label" htmlFor="showSubject">
                  Subject
                </label>
              </div>
            </li>
            <li className="dropdown-title pb-1">Showing</li>
            <li>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control form-control-sm w-50"
                  placeholder="10"
                />
                <button className="btn btn-sm btn-primary w-50">Apply</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmailContentHeader;
