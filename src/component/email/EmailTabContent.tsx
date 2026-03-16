import React from "react";
import { Tab } from "react-bootstrap";
import InboxContent from "./tab-panes/InboxContent";
import StarredPane from "./tab-panes/StarredPane";
import TrashPane from "./tab-panes/TrashPane";
import SentPane from "./tab-panes/SentPane";
import DraftPane from "./tab-panes/DraftPane";
import SpamPane from "./tab-panes/SpamPane";
import ImportantPane from "./tab-panes/ImportantPane";
import AllEmailPane from "./tab-panes/AllEmailPane";
type Props = {
  activeTab: string;
};
const EmailTabContent = ({ activeTab }: Props) => {
  return (
    <div className="panel rounded-0">
      <Tab.Content>
        <Tab.Pane
          eventKey="inbox"
          className={`tab-pane ${activeTab === "inbox" ? "show active" : ""}`}
        >
          <InboxContent />
        </Tab.Pane>
        <Tab.Pane
          eventKey="starred"
          className={`tab-pane ${activeTab === "starred" ? "show active" : ""}`}
        >
          <StarredPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="trash"
          className={`tab-pane ${activeTab === "trash" ? "show active" : ""}`}
        >
          <TrashPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="sent"
          className={`tab-pane ${activeTab === "sent" ? "show active" : ""}`}
        >
          <SentPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="draft"
          className={`tab-pane ${activeTab === "draft" ? "show active" : ""}`}
        >
          <DraftPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="all-email"
          className={`tab-pane ${
            activeTab === "all-email" ? "show active" : ""
          }`}
        >
          <AllEmailPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="spam"
          className={`tab-pane ${activeTab === "spam" ? "show active" : ""}`}
        >
          <SpamPane />
        </Tab.Pane>
        <Tab.Pane
          eventKey="important"
          className={`tab-pane ${
            activeTab === "important" ? "show active" : ""
          }`}
        >
          <ImportantPane />
        </Tab.Pane>
      </Tab.Content>
    </div>
  );
};

export default EmailTabContent;
