import React from "react";
import MailDetails from "../MailDetails";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";
import EmailContentHeader from "@/component/header/EmailContentHeader";
import EmailBodyHeader from "@/component/header/EmailBodyHeader";

const AllEmailPane = () => {
  return (
    <>
      <EmailContentHeader title={"All Email"} />
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

export default AllEmailPane;
