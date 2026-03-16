"use client";
import React from "react";
import ChatSlider from "../slider/ChatSlider";
import MessageList from "./MessageList";
import ChatingArea from "./ChatingArea";
import ChatSidebar from "./ChatSidebar";

const ChatMainSection = () => {
  return (
    <div className="d-flex">
      <div className="panel border-end rounded-0">
        <div className="panel-body border-bottom">
          <ChatSlider />
        </div>
        <MessageList />
      </div>
      <div className="panel rounded-0 position-relative">
        <ChatingArea />
      </div>
      <ChatSidebar />
    </div>
  );
};

export default ChatMainSection;
