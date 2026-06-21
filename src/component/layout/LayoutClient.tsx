"use client";

import React, { useEffect } from "react";
import HeaderSection from "../header/HeaderSection";
import ProfileRightSidebar from "../sidebar/right-sidebar/ProfileRightSidebar";
import MainSidebar from "../sidebar/MainSidebar";
import { useDigiContext } from "@/context/DigiContext";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Props = {
  children: React.ReactNode;
  session: any;
  encryptedString?: any;
};

const Layout = ({ children, session }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    toggleNav,
    currentNav,
    rtlDirection,
    mainBackgroundImg,
    rootLayoutRef,
  } = useDigiContext();

  useEffect(() => {
    if (!session?.user_id || !session?.role_id) {
      router.push("/login");
    }
  }, [session, router]);

  const smallnav = ["/leads","/leads/"];

  useEffect(() => {
    if (smallnav.includes(pathname)) {
      toggleNav("small-nav");
    } else {
      toggleNav("default-nav");
    }
  }, [pathname]);

  useEffect(() => {
    console.log("Current Nav:", currentNav);
  }, [currentNav]);

  Cookies.set(
    "7hLIAH2Jk3hGd6s",
    JSON.stringify(session),
    {
      path: "/",
      expires: 1,
    }
  );

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
    "/docs",
  ];

  const withoutLayout = pagesWithoutLayout.includes(pathname);

  if (withoutLayout) {
    return <>{children}</>;
  }

  return (
    <>
      {session?.user_id && session?.role_id && (
        <div
          className="body-padding body-p-top"
          style={{
            backgroundImage: `url(${mainBackgroundImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          dir={rtlDirection ? "rtl" : "ltr"}
          id="RootLayout"
          ref={rootLayoutRef}
        >
          <HeaderSection />
          <ProfileRightSidebar />
          <MainSidebar />
          {children}
        </div>
      )}
    </>
  );
};

export default Layout;