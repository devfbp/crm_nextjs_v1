import SweetAlertSection from "@/component/alert/SweetAlertSection";
import Footer from "@/component/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - SweetAlert Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <SweetAlertSection />
      <Footer />
    </main>
  );
}
