import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDigiContext } from "@/context/DigiContext";

interface File {
  name: string;
  files: number;
  storageUsed: string;
}

interface DropdownState {
  [key: string]: boolean;
}
const allFiles: File[] = [
  { name: "Design", files: 12, storageUsed: "3GB" },
  { name: "Development", files: 8, storageUsed: "2GB" },
  { name: "Sketch Design", files: 15, storageUsed: "4GB" },
  { name: "Project A", files: 10, storageUsed: "2.5GB" },
  { name: "Admin", files: 6, storageUsed: "1.5GB" },
  { name: "Applications", files: 20, storageUsed: "5GB" },
  { name: "Image", files: 30, storageUsed: "7GB" },
  { name: "Videos", files: 25, storageUsed: "10GB" },
];
const dropdownItems = [
  { title: "Details", icon: "fa-regular fa-eye" },
  { title: "Share", icon: "fa-regular fa-share-nodes" },
  { title: "Copy", icon: "fa-regular fa-copy" },
  { title: "Move", icon: "fa-regular fa-arrows-up-down-left-right" },
  { title: "Download", icon: "fa-regular fa-download" },
  { title: "Rename", icon: "fa-regular fa-pen" },
  { title: "Delete", icon: "fa-regular fa-trash" },
];

const AllFileSection = () => {
  const { handleNewFolderModalOpen, handleMobileFileManagerBtn } =
    useDigiContext();

  // State to manage the dropdown visibility
  const [dropdownBtn, setDropdownBtn] = useState<DropdownState>({
    btn1: false,
    btn2: false,
    btn3: false,
    btn4: false,
    btn5: false,
    btn6: false,
    btn7: false,
    btn8: false,
    btn9: false,
    btn10: false,
  });
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>(
    Array(Object.keys(dropdownBtn).length).fill(null)
  );
  const updateDropdownRef = (index: number, element: HTMLDivElement) => {
    dropdownRefs.current[index] = element;
  };

  const handleDropdownBtn = (id: keyof DropdownState) => {
    setDropdownBtn((prevCheckboxes) => {
      const newState: DropdownState = { ...prevCheckboxes };
      Object.keys(newState).forEach((key) => {
        newState[key as keyof DropdownState] = false;
      });
      newState[id] = !prevCheckboxes[id];
      return newState;
    });
  };
  const handleOutsideClick = (event: MouseEvent) => {
    dropdownRefs.current.forEach((ref, index) => {
      if (ref && !ref.contains(event.target as Node)) {
        setDropdownBtn((prevCheckboxes) => ({
          ...prevCheckboxes,
          [Object.keys(prevCheckboxes)[index]]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  return (
    <div className="panel mb-30">
      <div className="panel-header">
        <div className="mobile-file-manager-btn d-flex align-items-center gap-1">
          <button
            className="btn btn-sm btn-icon btn-primary file-manager-menu-btn d-lg-none"
            onClick={handleMobileFileManagerBtn}
          >
            <i className="fa-light fa-bars"></i>
          </button>
          <h5>All Files</h5>
        </div>
        <form className="file-search">
          <input
            type="search"
            id="fileSearch"
            className="form-control"
            placeholder="Search...."
          />
          <button>
            <i className="fa-light fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          {allFiles.map((file, index) => (
            <div className="col-md-3 col-sm-4 col-6" key={index}>
              <div className="file-manager-card">
                <div className="top">
                  <div className="part-icon">
                    <span>
                      <i className="fa-duotone fa-folder-open"></i>
                    </span>
                  </div>
                  <div
                    className="dropdown"
                    ref={(element) =>
                      element && updateDropdownRef(index, element)
                    }
                  >
                    <button
                      className="action"
                      onClick={() =>
                        handleDropdownBtn(
                          `btn${index + 1}` as keyof DropdownState
                        )
                      }
                    >
                      <i className="fa-regular fa-ellipsis-vertical"></i>
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        dropdownBtn[`btn${index + 1}`] ? "show" : ""
                      }`}
                    >
                      {dropdownItems.map((item, i) => (
                        <li key={i}>
                          <Link className="dropdown-item" href="#">
                            <span className="dropdown-icon">
                              <i className={item.icon}></i>
                            </span>{" "}
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bottom">
                  <div className="left">
                    <button className="folder-name">{file.name}</button>
                    <span className="file-quantity">{file.files} Files</span>
                  </div>
                  <div className="right">
                    <span className="storage-used">{file.storageUsed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12">
            <div className="d-flex justify-content-between">
              <button className="btn btn-sm btn-primary">
                <i className="fa-light fa-eye"></i> Show All
              </button>
              <button
                className="btn btn-sm btn-success"
                onClick={handleNewFolderModalOpen}
              >
                <i className="fa-light fa-plus"></i> Create Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFileSection;
