"use client";

import React, { useEffect, useRef } from "react";
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

  // Written during render (not in an effect) so that child components which
  // read it while rendering (accessMenuRole / accessMenuCheck) see it on the
  // first render. Only rewritten when the session actually changes.
  const sessionJson = JSON.stringify(session);
  const writtenSessionJson = useRef<string | null>(null);
  if (writtenSessionJson.current !== sessionJson) {
    Cookies.set("7hLIAH2Jk3hGd6s", sessionJson, {
      path: "/",
      expires: 1,
    });
    writtenSessionJson.current = sessionJson;
  }

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