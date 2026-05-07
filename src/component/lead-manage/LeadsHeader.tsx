"use client";
import { useDigiContext } from "@/context/DigiContext";
import React from "react";
import { Form } from "react-bootstrap";
import Link from "next/link";
import { LEADS_MENU_ID } from "@/data/constants";
import { useEffect, useState } from "react";
import { accessMenuCheck } from "@/component/utils/common";
import { accessMenuRole } from "../utils/common";
const LeadsHeader = (props: any) => {
  const { dropdown, headerRef, toggleDropdown } = useDigiContext();
  const [hasAccess, setHasAccess] = useState(false);
  const [title, setTitle] = useState("Manage Leads");
  const [urllink, setUrllink] = useState("/leads");
  useEffect(() => {
    setHasAccess(accessMenuCheck(LEADS_MENU_ID, props?.action));
    if (props?.action === 1) {
      setTitle("Manage Leads");
      setUrllink("/leads/new");
    } else if (props?.action === 2) {
      setTitle("Add Lead");
    } else if (props?.action === 3) {
      setTitle("Edit Lead");
    }
    else if (props?.action !="") {
      setTitle(props?.action);
    }
  }, []);
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      <div className="btn-box d-flex gap-2">
        
        {accessMenuRole(1) &&
          <>
            <Link href="/leads/new" className="btn btn-sm btn-primary">
              Add New
            </Link>
            <Link href="/leads/bulk-upload" className="btn btn-sm btn-primary">
              Bulk Upload
            </Link>
          </>
        }
        {hasAccess && props?.type === 2 &&
          <>
            <Link href={urllink} className="btn btn-sm btn-primary">
              View All
            </Link>
          </>
        }
      </div>
    </div>
  );
};

export default LeadsHeader;
