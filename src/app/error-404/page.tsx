import ErrorContent from "@/component/error/ErrorContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Error 404 Page",
  description: "",
};
export default function Home() {
  return (
    <ErrorContent
      imgSrc="assets/images/error-404.png"
      alt="404"
      subtitle="Page Not Found"
    />
  );
}
