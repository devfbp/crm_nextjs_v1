import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { fileManagerData } from "@/data/data";

type Props = {
  showStar?: boolean;
};

interface FileManagerItem {
  id: number;
  img: string;
  name: string;
  size: string;
  fileType: string;
}
interface DropdownState {
  [key: string]: boolean;
}
const FileManagerDataSection = ({ showStar }: Props) => {
  const { handleFileDetailsModalShow } = useDigiContext();
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
  const [starBtn, setStarBtn] = useState<DropdownState>({
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

  const handleStarBtn = (id: keyof DropdownState) => {
    setStarBtn((prevCheckboxes) => ({
      ...prevCheckboxes,
      [id]: !prevCheckboxes[id],
    }));
  };
  return (
    <>
      <div className="file-manager-col-head">
        <span>Thumbnail</span>
        <span>Name</span>
        <span>File Size</span>
        <span>Type</span>
        <span></span>
      </div>
      {fileManagerData.map((item: FileManagerItem, index) => (
        <div className="file-manager-col" key={index}>
          <div className="file-card">
            <div className="part-img">
              <button
                className="btn-flush"
                onClick={handleFileDetailsModalShow}
              >
                <img src={item.img} alt="Image" />
              </button>
            </div>
            <div className="part-txt">
              <div className="d-flex justify-content-between">
                <button
                  className="btn-flush file-name"
                  onClick={handleFileDetailsModalShow}
                >
                  {item.name}
                </button>
                <span className="file-size">{item.size}</span>
              </div>
            </div>
            <div className="file-type">
              <span>{item.fileType}</span>
            </div>
            <div
              className="dropdown action"
              ref={(element) => element && updateDropdownRef(index, element)}
            >
              {showStar && (
                <button
                  className={`btn-star ${
                    starBtn[`btn${item.id}`] ? "" : "starred"
                  }`}
                  onClick={() =>
                    handleStarBtn(`btn${item.id}` as keyof DropdownState)
                  }
                >
                  <i className="fa-solid fa-star"></i>
                </button>
              )}
              <button
                className={`btn-flush ${
                  dropdownBtn[`btn${item.id}`] ? "show" : ""
                }`}
                onClick={() =>
                  handleDropdownBtn(`btn${item.id}` as keyof DropdownState)
                }
                type="button"
              >
                <i className="fa-regular fa-ellipsis-vertical"></i>
              </button>
              <button
                className={`btn btn-sm btn-outline-primary  ${
                  dropdownBtn[`btn${item.id}`] ? "show" : ""
                }`}
                onClick={() =>
                  handleDropdownBtn(`btn${item.id}` as keyof DropdownState)
                }
                type="button"
              >
                Action <i className="fa-regular fa-angle-down"></i>
              </button>
              <ul
                className={`dropdown-menu dropdown-recent ${
                  dropdownBtn[`btn${item.id}`] ? "show" : ""
                }`}
              >
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleFileDetailsModalShow}
                  >
                    <span className="dropdown-icon">
                      <i className="fa-light fa-eye"></i>
                    </span>{" "}
                    View
                  </button>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <span className="dropdown-icon">
                      <i className="fa-light fa-pen"></i>
                    </span>{" "}
                    Rename
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <span className="dropdown-icon">
                      <i className="fa-light fa-arrows-up-down-left-right"></i>
                    </span>{" "}
                    Move
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    <span className="dropdown-icon">
                      <i className="fa-light fa-trash"></i>
                    </span>{" "}
                    Delete
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FileManagerDataSection;
