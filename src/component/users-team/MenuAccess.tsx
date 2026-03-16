"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

const MenuAccess = () => {
  const [menuData, setMenuData] = useState<MenuGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}menu`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch menu data");
        }

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

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="col-12 menu-access">
      <div className="card">
        <div className="card-header">Menu Access Information</div>

        <div className="card-body">
          {/* Table Header */}
          <div className="row fw-bold mb-2">
            <div className="col-md-4">Menu Name</div>
            <div className="col-md-2 text-center">View</div>
            <div className="col-md-2 text-center">Create</div>
            <div className="col-md-2 text-center">Edit</div>
            <div className="col-md-2 text-center">Delete</div>
          </div>

          {/* Menu Data */}
          {menuData.map((group) => (
            <div key={group.menu_group_id} className="mb-3">
              {/* Group Name */}
              {/* <div className="fw-semibold mb-2 ">
                <em>{group.menu_group_name}</em>
              </div> */}

              {/* If group has direct link */}
              {group.link && (
                <div className="row mb-2">
                  <div className="col-md-4">{group.menu_group_name}</div>
                  <div className="col-md-2 text-center">
                    <input type="checkbox" name="view[]" value={group.menu_group_id} className="form-check-input" />
                  </div>
                  <div className="col-md-2 text-center">
                    <input type="checkbox" name="create[]" value={group.menu_group_id} className="form-check-input" />
                  </div>
                  <div className="col-md-2 text-center">
                    <input type="checkbox" name="edit[]" value={group.menu_group_id} className="form-check-input" />
                  </div>
                  <div className="col-md-2 text-center">
                    <input type="checkbox" name="delete[]" value={group.menu_group_id} className="form-check-input" />
                  </div>
                </div>
              )}

              {/* If group has sub menu items */}
              {group.menuItems?.length ? (
                <div className="">
                  {group.menuItems.map((item) => (
                    <div className="row mb-2">
                      <div className="col-md-4">{item.menu_name}</div>
                      <div className="col-md-2 text-center">
                        <input type="checkbox" name="view[]" value={item.menu_id} className="form-check-input" />
                      </div>
                      <div className="col-md-2 text-center">
                        <input type="checkbox" name="create[]" value={item.menu_id} className="form-check-input" />
                      </div>
                      <div className="col-md-2 text-center">
                        <input type="checkbox" name="edit[]" value={item.menu_id} className="form-check-input" />
                      </div>
                      <div className="col-md-2 text-center">
                        <input type="checkbox" name="delete[]" value={item.menu_id} className="form-check-input" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuAccess;
