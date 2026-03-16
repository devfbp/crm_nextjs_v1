"use client";
import React from "react";
import HeaderSection from "../header/HeaderSection";
import RightSidebar from "../sidebar/RightSidebar";
import ProfileRightSidebar from "../sidebar/right-sidebar/ProfileRightSidebar";
import RightSidebarButton from "../header/RightSidebarButton";
import MainSidebar from "../sidebar/MainSidebar";
import { useDigiContext } from "@/context/DigiContext";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
  session: any;
  encryptedString?: any;
};
const Layout = ({ children, session, encryptedString }: Props) => {
  const router = useRouter();
  useEffect(() => {
    //console.log("session in layout client", session);
    if (!session?.user_id || !session?.role_id) {
      // toast.error("Please login to continue.");
      router.push('/login');
    } else {
      // toast.success("Login successfully.");
    }
  }, [session]);

  Cookies.set('7hLIAH2Jk3hGd6s', JSON.stringify(session), { path: '/', expires: 1 });
  const { rtlDirection, mainBackgroundImg, rootLayoutRef } = useDigiContext();
  const pathname = usePathname();
  const pagesWithoutLayout = [
    "/login",
    "/login-2",
    "/login-3",
    "/registration",
    "/registration-2",
    "/reset-password",
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
  ) :
    <>
      {session?.user_id && session?.role_id &&
        <>
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
            {/* <RightSidebarButton /> */}
            <MainSidebar />
            {children}
          </div>
        </>
      }
    </>
};

export default Layout;
