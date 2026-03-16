import React from "react";
import MailDetails from "../MailDetails";
import EmailContentHeader from "@/component/header/EmailContentHeader";
import EmailBodyHeader from "@/component/header/EmailBodyHeader";
import EmailDataContentTable from "@/component/tables/EmailDataContentTable";

const TrashPane = () => {
  return (
    <>
      <EmailContentHeader title={"Trash"} />
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

export default TrashPane;
