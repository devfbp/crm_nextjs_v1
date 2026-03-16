import type { Metadata } from "next";
import Main from "@/component/source/Main";

const pageTitle = "Source";
export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - " + pageTitle,
  description: pageTitle + " page of " + process.env.NEXT_PUBLIC_APP_NAME,
};

export default function Home() {
  return (
    <>
      <Main pageTitle={pageTitle} />
    </>
  );
}
