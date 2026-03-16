import React from "react";

const FileCategoryStatus = () => {
  return (
    <ul className="file-category-status">
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span className="text-success">
              <i className="fa-regular fa-image"></i>
            </span>
            <p>Images</p>
          </div>
          <span className="using-storage">47 MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            style={{ width: "25%" }}
          ></div>
        </div>
      </li>
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span className="text-danger-emphasis">
              <i className="fa-regular fa-video"></i>
            </span>
            <p>Videos</p>
          </div>
          <span className="using-storage">35 MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            style={{ width: "25%" }}
          ></div>
        </div>
      </li>
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span className="text-primary">
              <i className="fa-regular fa-file"></i>
            </span>
            <p>Docs</p>
          </div>
          <span className="using-storage">47 MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-primary"
            style={{ width: "25%" }}
          ></div>
        </div>
      </li>
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span className="text-warning">
              <i className="fa-regular fa-music"></i>
            </span>
            <p>Music</p>
          </div>
          <span className="using-storage">35 MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            style={{ width: "25%" }}
          ></div>
        </div>
      </li>
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span className="text-info">
              <i className="fa-regular fa-download"></i>
            </span>
            <p>Downloads</p>
          </div>
          <span className="using-storage">47 MB</span>
        </div>
        <div className="progress">
          <div className="progress-bar bg-info" style={{ width: "25%" }}></div>
        </div>
      </li>
      <li>
        <div className="progress-txt">
          <div className="file-category-name">
            <span>
              <i className="fa-regular fa-grid-2"></i>
            </span>
            <p>More</p>
          </div>
          <span className="using-storage">35 MB</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-secondary"
            style={{ width: "25%" }}
          ></div>
        </div>
      </li>
    </ul>
  );
};

export default FileCategoryStatus;
