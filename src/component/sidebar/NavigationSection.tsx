import React from "react";
import Link from "next/link";
import DashboardPart from "./DashboardPart";
import AppsPart from "./AppsPart";
import PagesPart from "./PagesPart";
import ComponentsPart from "./ComponentsPart";
import MenuSidebar   from "./MenuSidebar";


const NavigationSection = () => {
  return (
    <>
      <MenuSidebar />
      {/* <DashboardPart />
      <AppsPart />
      <PagesPart />
      <ComponentsPart /> */}

      <li className="help-center">
        <h3>App Download Center</h3>
        <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/mobile-app/apk/fbp-crm.apk`} className="btn btn-sm btn-light w-40">
          Android
        </a>
         <Link href="#" className="btn btn-sm btn-light mt-2 w-40">
          iOS
        </Link>
      </li>
    </>
  );
};

export default NavigationSection;
