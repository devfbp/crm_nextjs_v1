import EmailBodyHeader from "@/component/header/EmailBodyHeader";
import EmailContentHeader from "@/component/header/EmailContentHeader";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";
import React from "react";
import MailDetails from "../MailDetails";

const StarredPane = () => {
  return (
    <>
      <EmailContentHeader title={"Starred"} />
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

export default StarredPane;
