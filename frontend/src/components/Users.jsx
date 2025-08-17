import axios from "axios";

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";
const Users = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.trim() === "") {
      // Show all suppliers if search box is empty
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().startsWith(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("user deleted successfully");
          fetchUsers(); // Re-fetch categories after deletion
        } else {
          console.error("Failed to delete user:");
          alert("Failed to delete user.Please try again. ");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. See console for details.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <div>Loading users....</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/users/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Users added successfully:");
      setFormData({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "user",
      });
      fetchUsers();
    } else {
      console.error("Error adding user:");
      alert("Error adding user. please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8"> Users Management</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-[1.01]">
            <h2 className="text-center text-2xl font-bold mb-4">Add Users</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="User Name"
                  name="name"
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="User Email"
                  name="email"
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="User Password"
                  name="password"
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  type="address"
                  placeholder="User Address"
                  name="address"
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
              <div>
                <select
                  name="role"
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                >
                  <option value="">Selct Role</option>
                  <option value="admin">Admin</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                >
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:w-2/3">
          <input
            type="text"
            placeholder="Search User"
            className=" bg-white border rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02]"
            // className="border p-1 bg-white rounded px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02]"
            onChange={handleSearch}
          />

          <table className="w-full text-m text-center shadow-lg rounded-xl overflow-hidden hover:scale-[1.01] transition-transform duration-200">
            <thead className="bg-gradient-to-r from-green-500 via-emerald-600 to-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Serial No</th>
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredUsers &&
                filteredUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {user.address}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {user.role}
                    </td>
                    <td className="px-4 py-3 flex justify-center space-x-2">
                      <button
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-200 cursor-pointer"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
              No users found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
