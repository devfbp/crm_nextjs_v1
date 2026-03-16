import React from "react";
import MailDetails from "../MailDetails";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";

const UpdateContent = () => {
  return (
    <div className="table-wrapper">
      <div className="mail-list">
        <EmailDataContentTable />
      </div>
      <MailDetails />
    </div>
  );
};

export default UpdateContent;
