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
        console.error("Error deleting category:", error);
        alert("Error deleting category. See console for details.");
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
      <h1 className="text-2xl font-bold mb-8"> Category Manegement</h1>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <h2 className="text-center text-xl font-bold mb-4">
              {editCategory ? "Edit Category" : "Add Category"}
              Add Category
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  className="border rounded-md p-2 mb-4 w-full"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Category Description"
                  value={categoryDescription}
                  className="border rounded-md p-2  w-full"
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

        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-1g p-4">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 p-2">Serial No</th>
                  <th className="border border-gray-200 p-2">Category Name</th>
                  <th className="border border-gray-200 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">{index + 1} </td>
                    <td className="border border-gray-200 p-2">
                      {category.categoryName}
                    </td>
                    <td className="border border-gray-200 p-2">
                      <button
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mr-2"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mr-2"
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
    </div>
  );
};

export default Categories;
