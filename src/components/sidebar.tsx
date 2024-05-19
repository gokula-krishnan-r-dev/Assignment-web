import React, { useState } from "react";
import "../css/sidebar.css";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [activePage, setActivePage] = useState<string>("Home");
  const sidebarItems = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Add scenario", path: "/add/scenario" },
    { id: 3, label: "All scenario", path: "/all/scenario" },
    { id: 4, label: "Add vehicle", path: "/add/vehicle" },
  ];

  const handleClick = (page: string, path: string) => {
    setActivePage(page);
  };
  const pathname = window.location.pathname;
  return (
    <div className="wrapper-sidebar">
      <div className="sidebar">
        {sidebarItems.map((item) => (
          <a
            href={item.path}
            key={item.id}
            className={
              pathname === item.path ? "sidebar-item active" : "sidebar-item"
            }
            onClick={() => handleClick(item.label, item.path)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
