import ErrorContent from "@/component/error/ErrorContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Error 504 Page",
  description: "",
};
export default function Home() {
  return (
    <ErrorContent
      imgSrc="assets/images/error-504.png"
      alt="504"
      subtitle="Gateway Timeout"
    />
  );
}
