"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import Link from "next/link";
import { USER_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";

const UserHeader = (props: any) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [title, setTitle] = useState("Manage Website Leads");
  const [urllink, setUrllink] = useState("/website-lead");
  useEffect(() => {
    setHasAccess(accessMenuCheck(USER_MENU_ID, props?.action));
    if (props?.action === 1) {
      setTitle("Manage Website Leads");
      setUrllink("/website-lead/new");
    } else if (props?.action === 2) {
      setTitle("Add Website Lead");
    } else if (props?.action === 3) {
      setTitle("Edit Website Lead");
    }
  }, []);
  return (
    <>
      <div className="panel-header">
        <h2>{title}</h2>
        <div className="btn-box d-flex gap-2">
          {/* {hasAccess &&
            <Link href={urllink} className="btn btn-sm btn-primary">
              {props?.action === 1 ? "Add New" : "View All"}
            </Link>
          } */}
        </div>
      </div>
    </>
  );
};

export default UserHeader;
