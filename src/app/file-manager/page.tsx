import FileManagerSection from "@/component/file-manager/FileManagerSection";
import Footer from "@/component/footer/Footer";
import CreateFolderModal from "@/component/modal/CreateFolderModal";
import FileDetailsModal from "@/component/modal/FileDetailsModal";
import UploadFileModal from "@/component/modal/UploadFileModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - File Manager Page",
  description: "",
};

export default function Home() {
  return (
    <main className="main-content">
      <FileManagerSection />
      <FileDetailsModal />
      <UploadFileModal />
      <CreateFolderModal />
      <Footer />
    </main>
  );
}
