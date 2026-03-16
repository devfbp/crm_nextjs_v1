import ChatMainSection from "@/component/chat/ChatMainSection";
import Footer from "@/component/footer/Footer";
import VideoCallModal from "@/component/modal/VideoCallModal";
import VoiceCallModal from "@/component/modal/VoiceCallModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME + " - Chat",
  description: "",
};
export default function Home() {
  return (
    <main className="main-content">
      <div className="chatting-panel">
        <ChatMainSection />
      </div>
      <VoiceCallModal />
      <VideoCallModal />
      <Footer />
    </main>
  );
}
