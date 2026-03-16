import AddNewBreadcrumb from "@/component/breadcrumb/AddNewBreadcrumb";
import BankDetails from "@/component/employee/BankDetails";
import BasicInformation from "@/component/employee/BasicInformation";
import BiologicalInfo from "@/component/employee/BiologicalInfo";
import EmergencyContact from "@/component/employee/EmergencyContact";
import LoginInfo from "@/component/employee/LoginInfo";
import PermanentAddress from "@/component/employee/PermanentAddress";
import PersonalInformation from "@/component/employee/PersonalInformation";
import SalarySection from "@/component/employee/SalarySection";
import SaveBtn from "@/component/employee/SaveBtn";
import Footer from "@/component/footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Add Employee",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <AddNewBreadcrumb link="/allEmployee" title="Add Employee" />
      <div className="row g-4">
        <BasicInformation />
        <PersonalInformation />
        <SalarySection />
        <BankDetails />
        <PermanentAddress />
        <BiologicalInfo />
        <EmergencyContact />
        <LoginInfo />
        <SaveBtn />
      </div>
      <Footer />
    </main>
  );
}
