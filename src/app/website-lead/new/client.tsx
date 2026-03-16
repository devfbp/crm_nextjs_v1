"use client";
import Footer from "@/component/footer/Footer";
import UserHeader from "@/component/users-com/Header";
import Form from "@/component/users-com/Form";
import { USER_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";
import NoAccess from "@/component/error/NoAccess";

export default function Home() {
  const [records, setRecords] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  useEffect(() => {
    setHasAccess(accessMenuCheck(USER_MENU_ID, 2));
  }, []);
  return (
    <main className="main-content">
      {hasAccess ?
        <>
          <div className="row">
            <div className="col-12">
              <div className="panel">
                <UserHeader action={2} />
                <div className="panel-body p-0">
                  <Form records={records} setRecords={setRecords} editid={0} />
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
