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
        <h3>Help Center</h3>
        <p>We're an award-winning, forward thinking</p>
        <Link href="#" className="btn btn-sm btn-light">
          Go to Help Center
        </Link>
      </li>
    </>
  );
};

export default NavigationSection;
