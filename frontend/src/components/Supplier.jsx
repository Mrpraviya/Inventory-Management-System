/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Supplier = () => {
  const [addModal, setAddModal] = useState(null);
  const [editSupplier, setEditSupplier] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/supplier", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });

      setSuppliers(response.data.suppliers);
      setFilteredSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
    });
    setEditSupplier(supplier._id);
    setAddModal(true);
  };

  const closeModal = () => {
    setAddModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    setEditSupplier(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editSupplier) {
      // Handle update logic here
      try {
        const response = await axios.put(
          `http://localhost:3000/api/supplier/${editSupplier}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          fetchSuppliers(); // You can add this if you have a fetch function
          setFormData({ name: "", email: "", phone: "", address: "" });
          alert("Supplier edited successfully!");
          setAddModal(false);
          setEditSupplier(null);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
        } else {
          console.error("Error adding supplier:", response.data.message);
          alert("Error adding supplier. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/supplier/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          setFormData({ name: "", email: "", phone: "", address: "" });
          alert("Supplier added successfully!");
          setAddModal(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            address: "",
          });
          fetchSuppliers(); // You can add this if you have a fetch function
        } else {
          console.error("Error adding supplier:", response.data.message);
          alert("Error adding supplier. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Supplier?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/supplier/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Supplier deleted successfully");
          fetchSuppliers(); // Re-fetch categories after deletion
        } else {
          console.error("Failed to delete Supplier:", response.data);
          alert("Failed to delete supplier.Please try again. ");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Error deleting supplier. See console for details.");
        }
      }
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.trim() === "") {
      // Show all suppliers if search box is empty
      setFilteredSuppliers(suppliers);
    } else {
      const filtered = suppliers.filter(
        (supplier) => supplier.name.toLowerCase().startsWith(searchTerm) // match from first letter
      );
      setFilteredSuppliers(filtered);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Supplier Management</h1>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search here"
          className="border p-1 bg-white rounded px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:scale-[1.02]"
          onChange={handleSearch}
        />
        <button
          className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer hover:scale-[1.02]"
          onClick={() => {
            setFormData({ name: "", email: "", phone: "", address: "" });
            setEditSupplier(null);
            setAddModal(true);
          }}
        >
          Add Supplier
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table className="mt-6 w-full text-m text-center shadow-lg rounded-lg overflow-hidden hover:scale-[1.01] transition-transform duration-200">
            <thead className="bg-gradient-to-r from-green-500 via-emerald-600 to-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Serial No</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredSuppliers.map((supplier, index) => (
                <tr
                  key={supplier._id}
                  className="hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {supplier.name}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {supplier.email}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {supplier.phone}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {supplier.address}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleEdit(supplier)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleDelete(supplier._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSuppliers.length === 0 && (
            <div className="text-center mt-4">No suppliers found</div>
          )}
        </div>
      )}

      {addModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/4 relative">
            <h1 className="text-xl font-bold mb-4">Add Supplier</h1>

            <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
              <button
                type="button"
                className="absolute top-4 right-4 font-bold text-black-500 hover:text-red-800 text-lg"
                onClick={closeModal}
                title="Cancel"
              >
                X
              </button>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Supplier Name"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Supplier Email"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Supplier Phone No."
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Supplier Address"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* <button
                type="submit"
                className="px-4 py-1.5 bg-blue-500 text-white rounded cursor-pointer"
              >
                Save
              </button> */}

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                >
                  {editSupplier ? "Save Changes " : " SAVE"}
                </button>
                {editSupplier && (
                  <button
                    type="button"
                    className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600 "
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Supplier;
