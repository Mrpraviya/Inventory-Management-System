// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */

// import React from "react";
// import { useState } from "react";
// import {
//   FaBox,
//   FaCog,
//   FaHome,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaTable,
//   FaTruck,
//   FaUsers,
// } from "react-icons/fa";
// import { NavLink } from "react-router";
// import { useAuth } from "../context/AuthContext.jsx";
// import { useEffect } from "react";

// const Sidebar = () => {
//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/admin-dashboard",
//       icon: <FaHome />,
//       isParent: true,
//     },
//     {
//       name: "Categories",
//       path: "/admin-dashboard/categories",
//       icon: <FaTable />,
//     },
//     {
//       name: "Products",
//       path: "/admin-dashboard/products",
//       icon: <FaBox />,
//       isParent: false,
//     },
//     {
//       name: "Suppliers",
//       path: "/admin-dashboard/suppliers",
//       icon: <FaTruck />,
//     },
//     {
//       name: "Orders",
//       path: "/admin-dashboard/orders",
//       icon: <FaShoppingCart />,
//     },
//     {
//       name: "Users",
//       path: "/admin-dashboard/users",
//       icon: <FaUsers />,
//       isParent: false,
//     },
//     {
//       name: "Profile",
//       path: "/admin-dashboard/profile",
//       icon: <FaCog />,
//       isParent: false,
//     },
//     {
//       name: "Logout",
//       path: "/admin-dashboard/logout",
//       icon: <FaSignOutAlt />,
//       isParent: false,
//     },
//   ];

//   const customerItems = [
//     {
//       name: "Products",
//       path: "/customer-dashboard",
//       icon: <FaBox />,
//       isParent: true,
//     },

//     {
//       name: "Orders",
//       path: "/customer-dashboard/orders",
//       icon: <FaShoppingCart />,
//     },

//     {
//       name: "Profile",
//       path: "/customer-dashboard/profile",
//       icon: <FaCog />,
//       isParent: false,
//     },

//     {
//       name: "Logout",
//       path: "/customer-dashboard/logout",
//       icon: <FaSignOutAlt />,
//       isParent: false,
//     },
//   ];

//   const { user } = useAuth();
//   const [menuLinks, setMenuLinks] = useState(customerItems);

//   useEffect(() => {
//     if (user && user.role === "admin") {
//       // Set menu items based on user role

//       setMenuLinks(menuItems);
//     }

//     // This effect can be used to fetch user-specific menu items if needed
//   }, []);

//   return (
//     <div className="flex flex-col md:w-64 h-screen bg-black fixed text-white w-16">
//       <div className="flex flex-items justify-center h-16 ">
//         <span className="hidden md:block text-xl font-bold">Inventory MS</span>
//         <span className="md:hidden text-xl font-bold">IMS</span>
//       </div>

//       <div>
//         <ul className="space-y-2 p-2">
//           {menuLinks.map((item) => (
//             <li key={item.name}>
//               <NavLink
//                 end={item.isParent}
//                 className={({ isActive }) =>
//                   (isActive ? "bg-gray-700 " : " ") +
//                   "flex items-center p-2 rounded-md hover:bg-gray-700 transition duration-200 "
//                 }
//                 to={item.path}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 <span className="ml-4 hidden md:block">{item.name}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */

// import React, { useState, useEffect } from "react";
// import {
//   FaBox,
//   FaCog,
//   FaHome,
//   FaShoppingCart,
//   FaSignOutAlt,
//   FaTable,
//   FaTruck,
//   FaUsers,
// } from "react-icons/fa";
// import { NavLink } from "react-router";
// import { useAuth } from "../context/AuthContext.jsx";

// const Sidebar = () => {
//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/admin-dashboard",
//       icon: <FaHome />,
//       isParent: true,
//     },
//     {
//       name: "Categories",
//       path: "/admin-dashboard/categories",
//       icon: <FaTable />,
//     },
//     {
//       name: "Products",
//       path: "/admin-dashboard/products",
//       icon: <FaBox />,
//     },
//     {
//       name: "Suppliers",
//       path: "/admin-dashboard/suppliers",
//       icon: <FaTruck />,
//     },
//     {
//       name: "Orders",
//       path: "/admin-dashboard/orders",
//       icon: <FaShoppingCart />,
//     },
//     {
//       name: "Users",
//       path: "/admin-dashboard/users",
//       icon: <FaUsers />,
//     },
//     {
//       name: "Profile",
//       path: "/admin-dashboard/profile",
//       icon: <FaCog />,
//     },
//     {
//       name: "Logout",
//       path: "/admin-dashboard/logout",
//       icon: <FaSignOutAlt />,
//     },
//   ];

//   const customerItems = [
//     {
//       name: "Products",
//       path: "/customer-dashboard",
//       icon: <FaBox />,
//       isParent: true,
//     },
//     {
//       name: "Orders",
//       path: "/customer-dashboard/orders",
//       icon: <FaShoppingCart />,
//     },
//     {
//       name: "Profile",
//       path: "/customer-dashboard/profile",
//       icon: <FaCog />,
//     },
//     {
//       name: "Logout",
//       path: "/customer-dashboard/logout",
//       icon: <FaSignOutAlt />,
//     },
//   ];

//   const { user } = useAuth();
//   const [menuLinks, setMenuLinks] = useState(customerItems);

//   useEffect(() => {
//     if (user && user.role === "admin") {
//       setMenuLinks(menuItems);
//     }
//   }, []);

//   return (
//     <div className="flex flex-col fixed h-screen w-16 md:w-64 
//       bg-white/20 backdrop-blur-lg border-r border-white/30 
//       text-white shadow-2xl transition-all duration-300">
      
//       {/* Branding */}
//       <div className="flex items-center justify-center md:justify-start h-16 px-4 border-b border-white/20">
//         <span className="hidden md:block text-lg font-bold tracking-wide text-green-200 drop-shadow">
//           Inventory MS
//         </span>
//         <span className="md:hidden text-lg font-bold text-green-200">IMS</span>
//       </div>

//       {/* Menu Items */}
//       <div className="flex-1 overflow-y-auto mt-4">
//         <ul className="space-y-2 px-2">
//           {menuLinks.map((item) => (
//             <li key={item.name}>
//               <NavLink
//                 end={item.isParent}
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center p-3 rounded-lg transition-all duration-200 
//                    ${isActive ? "bg-green-600/80 shadow-lg" : "hover:bg-white/10"}`
//                 }
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 <span className="ml-4 hidden md:block">{item.name}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Footer */}
//       <div className="text-center text-xs text-gray-300 p-3 border-t border-white/20">
//         © 2025 IMS
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
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

const SidebarLightGlass = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> },
    { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable /> },
    { name: "Products", path: "/admin-dashboard/products", icon: <FaBox /> },
    { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck /> },
    { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers /> },
    { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog /> },
    { name: "Logout", path: "/admin-dashboard/logout", icon: <FaSignOutAlt /> },
  ];

  const customerItems = [
    { name: "Products", path: "/customer-dashboard", icon: <FaBox /> },
    { name: "Orders", path: "/customer-dashboard/orders", icon: <FaShoppingCart /> },
    { name: "Profile", path: "/customer-dashboard/profile", icon: <FaCog /> },
    { name: "Logout", path: "/customer-dashboard/logout", icon: <FaSignOutAlt /> },
  ];

  const { user } = useAuth();
  const [menuLinks, setMenuLinks] = useState(customerItems);

  useEffect(() => {
    if (user && user.role === "admin") setMenuLinks(menuItems);
  }, []);

  return (
    <div className="flex flex-col fixed h-screen w-16 md:w-64 bg-gradient-to-r  bg-gray-900 backdrop-blur-lg  shadow-xl text-gray-800 ">
      {/* Branding */}
      <div className="flex items-center justify-center md:justify-start h-16 px-4 ">
        <span className="hidden md:block text-2xl font-bold tracking-wide text-white ">
          INVENTORY MS
        </span>
        <span className="md:hidden text-lg font-bold text-white">IMS</span>
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto mt-4">
        <ul className="space-y-2 px-2">
          {menuLinks.map((item) => (
            <li key={item.name}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-all duration-300 
                   ${isActive ? "bg-emerald-500 text-black " : "hover:bg-emerald-600/80 text-white"}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="ml-4 hidden md:block">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="text-center font-bold text-xs text-gray-400 p-3  ">
        © Inventory Management System 2025
      </div>
    </div>
  );
};

export default SidebarLightGlass;

