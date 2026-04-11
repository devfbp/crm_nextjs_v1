"use client";
import React from "react";
import HeaderSection from "../header/HeaderSection";
import RightSidebar from "../sidebar/RightSidebar";
import ProfileRightSidebar from "../sidebar/right-sidebar/ProfileRightSidebar";
import RightSidebarButton from "../header/RightSidebarButton";
import MainSidebar from "../sidebar/MainSidebar";
import { useDigiContext } from "@/context/DigiContext";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  const { rtlDirection, mainBackgroundImg, rootLayoutRef } = useDigiContext();
  const pathname = usePathname();
  const pagesWithoutLayout = [
    "/login",
    "/login-2",
    "/login-3",
    "/registration",
    "/registration-2",
    "/reset-password",
    "/forgot-password",
    "/update-password",
    "/login-status",
    "/error-400",
    "/error-403",
    "/error-404",
    "/error-408",
    "/error-500",
    "/error-503",
    "/error-504",
    "/coming-soon",
    "/coming-soon-2",
    "/pricing-table",
    "/pricing-table-2",
    "/under-construction",
  ];
  const withoutLayout = pagesWithoutLayout.find((item) => item === pathname);
  return withoutLayout ? (
    <>{children}</>
  ) : (
    <div
      className={`body-padding body-p-top`}
      style={{
        backgroundImage: `url(${mainBackgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      dir={`${rtlDirection ? "rtl" : ""}`}
      id="RootLayout"
      ref={rootLayoutRef}
    >
      <HeaderSection />
      {/* <RightSidebar /> */}
      <ProfileRightSidebar />
      <RightSidebarButton />
      <MainSidebar />
      {children}
    </div>
  );
};

export default Layout;
