"use client";
import { useDigiContext } from "@/context/DigiContext";
import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import { accessMenuCheck } from "../utils/common";

const AppsPart = (props) => {
  const [menuData, setMenuData] = React.useState(null);
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "menu").then((res) => res.json()).then((data) => {
      //console.log("Sidebar Menu Data:", data);
      setMenuData(data);
    });
  }, []);
  const {
    toggleMainSidebarDropdown,
    mainSidebarDropdown,
    openSubMenu,
    toggleSubMenu,
    mainRef,
  } = useDigiContext();

  return (
    <>
      {
        menuData?.map((groupitem, groupindex) => (

          <React.Fragment key={groupitem?.menu_group_id}>
            {accessMenuCheck(groupitem?.menu_group_id, 0) === true &&
              groupitem?.link != null ?
              <li className="sidebar-item">
                <a
                  href={groupitem?.link}
                  role="button"
                  className={`sidebar-link-group-title menugroup-icon`}
                >{groupitem?.menu_group_name}</a>
              </li>
              :
              <>
                {accessMenuCheck(groupitem?.menu_group_id, 0) === true &&
                  <li className="sidebar-item">
                    <a
                      role="button"
                      className={`sidebar-link-group-title has-sub  ${mainSidebarDropdown.includes(groupitem?.menu_group_id) ? "" : "show"
                        }`}
                      onClick={() => toggleMainSidebarDropdown(groupitem?.menu_group_id)}
                    >{groupitem?.menu_group_name}</a>
                    <ul
                      className={`sidebar-link-group  ${mainSidebarDropdown.includes(groupitem?.menu_group_id) ? "" : "show"
                        }`}
                    >
                      {
                        groupitem?.menuItems?.map((item, index) => (
                          accessMenuCheck(item?.menu_id, 1) === true &&
                          <li className="sidebar-dropdown-item">
                            <Link href={item?.link} className="sidebar-link">
                              <span className="nav-icon">
                                <i className={`fa-light ${item?.icon}`}></i>
                              </span>{" "}
                              <span className="sidebar-txt">{item?.menu_name}</span>
                            </Link>
                          </li>

                        ))
                      }
                    </ul>
                  </li>
                }
              </>
            }
          </React.Fragment>
        ))}
    </>
  );
};

export default AppsPart;