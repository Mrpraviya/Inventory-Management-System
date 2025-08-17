import axios from "axios";

// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { useState } from "react";
const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      console.log(response.data.categories);
      setCategories(response.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = async (category) => {
    setEditCategory(category._id);
    setCategoryName(category.categoryName);
    setCategoryDescription(category.categoryDescription);
  };

  const handleCancel = async () => {
    setEditCategory(null);
    setCategoryName("");
    setCategoryDescription("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Category deleted successfully");
          fetchCategories(); // Re-fetch categories after deletion
        } else {
          console.error("Failed to delete category:", response.data);
          alert("Failed to delete category.Please try again. ");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Error deleting category. See console for details.");
        }
      }
    }
  };

  if (loading) {
    return <div>Loading categories....</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert("Please fill in both fields before submitting.");
      return;
    }

    if (editCategory) {
      const response = await axios.put(
        `http://localhost:3000/api/category/${editCategory}`,
        {
          categoryName,
          categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
        alert("Category updated successfully:");
        fetchCategories();
      } else {
        console.error("Error editing category:");
        alert("Error editing category. please try again.");
      }
    } else {
      const response = await axios.post(
        "http://localhost:3000/api/category/add",
        {
          categoryName,
          categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {
        setCategoryName("");
        setCategoryDescription("");
        alert("Category added successfully:");
        fetchCategories();
      } else {
        console.error("Error adding category:");
        alert("Error adding category. please try again.");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8"> Category Manegement</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md hover:scale-[1.01]">
            <h2 className="text-center text-xl font-bold mb-4">
              {editCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                   
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Category Description"
                  value={categoryDescription}
                  className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                >
                  {editCategory ? "Save Changes " : " Add Category"}
                </button>
                {editCategory && (
                  <button
                    type="button"
                    className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600 "
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="lg:w-2/3 ">
          <table className="w-full text-m text-center shadow-lg rounded-xl overflow-hidden hover:scale-[1.01]">
            <thead className="bg-gradient-to-r from-green-500 via-emerald-600 to-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Serial No</th>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {categories.map((category, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {category.categoryName}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleDelete(category._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
