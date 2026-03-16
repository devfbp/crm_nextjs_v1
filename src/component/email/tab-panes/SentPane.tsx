import React from "react";
import MailDetails from "../MailDetails";
import EmailBodyHeader from "@/component/header/EmailBodyHeader";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";
import EmailContentHeader from "@/component/header/EmailContentHeader";

const SentPane = () => {
  return (
    <>
      <EmailContentHeader title={"Sent"} />
      <div className="panel-body">
        <EmailBodyHeader />
        <div className="table-wrapper">
          <div className="mail-list">
            <EmailDataContentTable />
          </div>
          <MailDetails />
        </div>
      </div>
    </>
  );
};

export default SentPane;
