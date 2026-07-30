import type { Metadata } from "next";
import Main from "@/component/role/Main";

const pageTitle = "Role";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function Home() {
  return (
    <>
      <ul className="d-flex flex-column align-items-center justify-content-center">
        <li className="help-center w-80 text-center">
          <h3 className="mb-3">App Download Center</h3>

          <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/mobile-app/apk/fbp-crm.apk`}
            className="btn btn-sm btn-light w-40 mb-2">
            Android
          </a>

          <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/mobile-app/ios`}
            className="btn btn-sm btn-light w-40">
            iOs
          </a>
        </li>
      </ul>
    </>
  );
}