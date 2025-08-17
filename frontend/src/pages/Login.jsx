/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */

// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router";
// import axios from "axios";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // use "" not null
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // ✅ corrected typo
//     setLoading(true);
//     setError(""); // clear error on new submit

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );

//       console.log("Login Response:", response.data);

//       if (response.data.success) {
//         await login(response.data.user, response.data.token);
//         if (response.data.user.role === "admin") {
//           navigate("/admin-dashboard");
//         } else {
//           navigate("/customer-dashboard");
//         }
//       } else {
//         setError(response.data.error || "Login failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Login Error:", err.response);
//       if (err.response && err.response.data?.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Invalid credentials.Try again");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col items-center h-screen justify-center
//       bg-gradient-to-b from-green-600 from-50% to-gray-100 to-50% space-y-6"
//     >
//       <h2 className="text-3xl text-white">Inventory Management System</h2>
//       <div className="border shadow-lg p-6 w-80 bg-white">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         {error && (
//           <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               className="w-full px-3 py-2 border"
//               name="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your Email"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border"
//               name="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your Password"
//             />
//           </div>
//           <div className="mb-4">
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-2"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.success) {
        await login(response.data.user, response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      } else {
        setError(response.data.error || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login Error:", err.response);
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials. Try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-500 via-emerald-600 to-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-8">
        Inventory Management System
      </h1>

      <div className="w-96 bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/30">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/80 text-white p-3 mb-4 rounded-lg text-sm shadow-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-100 text-sm mb-1">Email :</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <label className="block text-gray-100 text-sm mb-1">
              Password :
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-gray-200 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-700 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
