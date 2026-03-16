import Footer from "@/component/footer/Footer";
import IconSection from "@/component/icon/IconSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Icons Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <IconSection />
      <Footer />
    </main>
  );
}
