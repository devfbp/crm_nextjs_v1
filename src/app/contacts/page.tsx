import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import ContactForm1 from "@/component/forms/ContactForm1";
import ContactForm2 from "@/component/forms/ContactForm2";
import ContactForm3 from "@/component/forms/ContactForm3";
import ContactForm4 from "@/component/forms/ContactForm4";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Contacts",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Contact Forms" />
      <div className="row g-4">
        <ContactForm1 />
        <ContactForm2 />
        <ContactForm3 />
        <ContactForm4 />
      </div>

      <Footer />
    </main>
  );
}
