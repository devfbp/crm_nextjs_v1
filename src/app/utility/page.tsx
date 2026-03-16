import Footer from "@/component/footer/Footer";
import UtilitySection from "@/component/utils/UtilitySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Utility Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <UtilitySection />
      <Footer />
    </main>
  );
}
