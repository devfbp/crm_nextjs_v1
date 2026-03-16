"use client";
import Footer from "@/component/footer/Footer";
import UserHeader from "@/component/users-com/Header";
import Admin from "@/component/users-com/Admin";
import { USER_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";
import NoAccess from "@/component/error/NoAccess";

export default function Client() {
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    setHasAccess(accessMenuCheck(USER_MENU_ID, 1));
  }, []);
  return (
    <main className="main-content">
      {hasAccess ?
        <>
          <div className="row">
            <div className="col-12">
              <div className="panel">
                <UserHeader action={1} />
                <div className="panel-body p-0">
                  <Admin />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
        :
        <NoAccess />
      }
    </main>
  );
}
