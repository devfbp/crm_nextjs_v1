import EmailSection from "@/component/email/EmailSection";
import Footer from "@/component/footer/Footer";
import ComposeMailModal from "@/component/modal/ComposeMailModal";
import MailDetailsModal from "@/component/modal/MailDetailsModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Email",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <EmailSection />
      <ComposeMailModal />
      <MailDetailsModal />
      <Footer />
    </main>
  );
}
