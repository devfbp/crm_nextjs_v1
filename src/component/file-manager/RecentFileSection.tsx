import React, { useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import FileManagerDataSection from "./FileManagerDataSection";

type Props = {
  state: boolean;
};
const RecentFileSection = ({ state }: Props) => {
  const [isView, setIsView] = useState<boolean>(state);

  const handleListView = () => {
    setIsView(true);
  };

  const handleGridView = () => {
    setIsView(false);
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Recent Files</h5>
        <div className="btn-box">
          <button
            className={`btn btn-sm btn-icon btn-outline-primary btn-grid-view ${
              isView ? "" : "active"
            }`}
            onClick={handleGridView}
          >
            <i className="fa-solid fa-grid-2"></i>
          </button>
          <button
            className={`btn btn-sm btn-icon btn-outline-primary btn-list-view ${
              isView ? "active" : ""
            }`}
            onClick={handleListView}
          >
            <i className="fa-regular fa-bars"></i>
          </button>
        </div>
      </div>
      <div className="panel-body">
        <OverlayScrollbarsComponent>
          <div>
            <div
              className={`file-manager-row recent-files ${
                isView ? "list-view" : ""
              }`}
            >
              <FileManagerDataSection />
            </div>
          </div>
        </OverlayScrollbarsComponent>
        <div className="part-btn text-center">
          <p>Showing 10 of 100 items</p>
          <button className="btn btn-sm btn-primary">Load More</button>
        </div>
      </div>
    </div>
  );
};

export default RecentFileSection;
