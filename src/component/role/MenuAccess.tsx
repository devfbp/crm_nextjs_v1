"use client";

import React, { useEffect, useState } from "react";
import "./Form.scss";

interface MenuItem {
  menu_id: number;
  menu_name: string;
  link: string;
  icon?: string;
}

interface MenuGroup {
  menu_group_id: number;
  menu_group_name: string;
  link?: string | null;
  menuItems?: MenuItem[];
}

type PermissionType = "parent_menu" | "view" | "create" | "edit" | "delete";

interface AccessMenu {
  view: number[];
  create: number[];
  edit: number[];
  delete: number[];
  parent_menu: number[];
}

const MenuAccess = ({ records }: any) => {
  const [menuData, setMenuData] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [accessMenu, setAccessMenu] = useState<AccessMenu>({
    view: [],
    create: [],
    edit: [],
    delete: [],
    parent_menu: [],
  });

  // Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}menu`
        );

        if (!res.ok) throw new Error("Failed to fetch menu data");

        const data = await res.json();
        setMenuData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Initialize access menu from props
  useEffect(() => {
    if (records?.access_menu) {
      setAccessMenu(records.access_menu);
    }
  }, [records]);

  const handleCheckboxChange = (
    type: PermissionType,
    id: number
  ) => {
    setAccessMenu((prev) => {
      const exists = prev[type]?.includes(id);

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((item) => item !== id)
          : [...(prev[type] || []), id],
      };
    });
  };

  const renderCheckbox = (
    type: PermissionType,
    id: number
  ) => (
    <input
      type="checkbox"
      name={`${type}[]`}
      value={id}
      className="form-check-input"
      checked={accessMenu[type]?.includes(id.toString() as any)}
      onChange={() => handleCheckboxChange(type, id.toString() as any)}
    />
  );

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="col-12 menu-access">
      <div className="card">
        <div className="card-header">
          Menu Access Information
        </div>

        <div className="card-body">
          {/* Header */}
          <div className="row fw-bold mb-2">
            <div className="col-md-4">Menu Name</div>
            <div className="col-md-2 text-center">View</div>
            <div className="col-md-2 text-center">Create</div>
            <div className="col-md-2 text-center">Edit</div>
            <div className="col-md-2 text-center">Delete</div>
          </div>

          {menuData.map((group) => (
            <div key={group.menu_group_id} className="mb-3">

              {/* Group direct link */}
              {group.menu_group_name && (
                <div className="row mb-2">
                  <div className="col-md-4 fw-bold italic">
                    {group.menu_group_name}
                  </div>

                  {(["parent_menu"] as PermissionType[])
                    .map((type) => (
                      <div
                        key={type}
                        className="col-md-2 text-center"
                      >
                        {renderCheckbox(type, group.menu_group_id)}
                      </div>
                    ))}
                </div>
              )}

              {/* Submenus */}
              {group.menuItems?.map((item) => (
                <div
                  key={item.menu_id}
                  className="row mb-2"
                >
                  <div className="col-md-4">
                    {item.menu_name+" ("+item.menu_id+")"}
                  </div>

                  {(["view", "create", "edit", "delete"] as PermissionType[])
                    .map((type) => (
                      <div
                        key={type}
                        className="col-md-2 text-center"
                      >
                        {renderCheckbox(type, item.menu_id)}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuAccess;
