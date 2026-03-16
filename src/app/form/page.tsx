import DashboardBreadcrumb2 from "@/component/breadcrumb/DashboardBreadcrumb2";
import Footer from "@/component/footer/Footer";
import ButtonGroupSection from "@/component/forms/ButtonGroupSection";
import DropdownButtonSection from "@/component/forms/DropdownButtonSection";
import FIleInputSection from "@/component/forms/FIleInputSection";
import FileUploaderSection from "@/component/forms/FileUploaderSection";
import FormLayoutSection from "@/component/forms/FormLayoutSection";
import InputExampleSection from "@/component/forms/InputExampleSection";
import InputGroupSection from "@/component/forms/InputGroupSection";
import InputGroupSizingSection from "@/component/forms/InputGroupSizingSection";
import InputSizingSection from "@/component/forms/InputSizingSection";
import MultipleInputSection from "@/component/forms/MultipleInputSection";
import RichTextEditorSection from "@/component/forms/RichTextEditorSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Form Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <DashboardBreadcrumb2 title="Form Elements" />
      <div className="row">
        <div className="col-lg-6">
          <InputExampleSection />
          <FIleInputSection />
          <InputGroupSection />
        </div>
        <div className="col-lg-6">
          <InputSizingSection />
          <InputGroupSizingSection />
          <MultipleInputSection />
          <ButtonGroupSection />
          <DropdownButtonSection />
        </div>
        <FormLayoutSection />
        <FileUploaderSection />
        <RichTextEditorSection />
      </div>

      <Footer />
    </main>
  );
}
