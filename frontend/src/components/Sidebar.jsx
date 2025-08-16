/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React from "react";
import { useState } from "react";
import {
  FaBox,
  FaCog,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaTable,
  FaTruck,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaHome />,
      isParent: true,
    },
    {
      name: "Categories",
      path: "/admin-dashboard/categories",
      icon: <FaTable />,
    },
    {
      name: "Products",
      path: "/admin-dashboard/products",
      icon: <FaBox />,
      isParent: false,
    },
    {
      name: "Suppliers",
      path: "/admin-dashboard/suppliers",
      icon: <FaTruck />,
    },
    {
      name: "Orders",
      path: "/admin-dashboard/orders",
      icon: <FaShoppingCart />,
    },
    {
      name: "Users",
      path: "/admin-dashboard/users",
      icon: <FaUsers />,
      isParent: false,
    },
    {
      name: "Profile",
      path: "/admin-dashboard/profile",
      icon: <FaCog />,
      isParent: false,
    },
    {
      name: "Logout",
      path: "/admin-dashboard/logout",
      icon: <FaSignOutAlt />,
      isParent: false,
    },
  ];

  const customerItems = [
    {
      name: "Products",
      path: "/customer-dashboard",
      icon: <FaBox />,
      isParent: true,
    },

    {
      name: "Orders",
      path: "/customer-dashboard/orders",
      icon: <FaShoppingCart />,
    },

    {
      name: "Profile",
      path: "/customer-dashboard/profile",
      icon: <FaCog />,
      isParent: false,
    },

    {
      name: "Logout",
      path: "/customer-dashboard/logout",
      icon: <FaSignOutAlt />,
      isParent: false,
    },
  ];

  const { user } = useAuth();
  const [menuLinks, setMenuLinks] = useState(customerItems);

  useEffect(() => {
    if (user && user.role === "admin") {
      // Set menu items based on user role

      setMenuLinks(menuItems);
    }

    // This effect can be used to fetch user-specific menu items if needed
  }, []);

  return (
    <div className="flex flex-col md:w-64 h-screen bg-black fixed text-white w-16">
      <div className="flex flex-items justify-center h-16 ">
        <span className="hidden md:block text-xl font-bold">Inventory MS</span>
        <span className="md:hidden text-xl font-bold">IMS</span>
      </div>

      <div>
        <ul className="space-y-2 p-2">
          {menuLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                end={item.isParent}
                className={({ isActive }) =>
                  (isActive ? "bg-gray-700 " : " ") +
                  "flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 "
                }
                to={item.path}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4 hidden md:block">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
