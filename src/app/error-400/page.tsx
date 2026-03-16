import ErrorContent from "@/component/error/ErrorContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Error 400 Page",
  description: "",
};
export default function Home() {
  return (
    <ErrorContent
      imgSrc="assets/images/error-400.png"
      alt="400"
      subtitle="Bad Request"
    />
  );
}
