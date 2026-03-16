import EmailBodyHeader from "@/component/header/EmailBodyHeader";
import EmailContentHeader from "@/component/header/EmailContentHeader";
import React from "react";
import MailDetails from "../MailDetails";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";

const ImportantPane = () => {
  return (
    <>
      <EmailContentHeader title={"Important"} />
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

export default ImportantPane;
