// /* eslint-disable no-unused-vars */

// import React from "react";
// import Sidebar from "../components/Sidebar";
// import { Outlet } from "react-router";

// const Dashboard = () => {
//   return (
//     <div>
//       <div className="flex">
//         <Sidebar />

//         <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen ">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 transition-all duration-500">
      {/* className="flex min-h-screen bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 transition-all duration-500" <----Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-64 bg-gradient-to-r from-gray-900 via-emerald-600 to-green-500  shadow-xl p-6 min-h-screen">
        <div className="bg-gray-200 rounded-2xl shadow-2xl p-4 h-full transition-transform duration-300 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
