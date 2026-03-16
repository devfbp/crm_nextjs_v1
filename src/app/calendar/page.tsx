import CalenderMain from "@/component/calender/CalenderMain";
import Footer from "@/component/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Calender",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <CalenderMain />
      <Footer />
    </main>
  );
}
