import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        Copyright© {new Date().getFullYear()} All Rights Reserved By{" "}
        <span className="text-primary">FBPcrm</span>
      </p>
    </div>
  );
};

export default Footer;
