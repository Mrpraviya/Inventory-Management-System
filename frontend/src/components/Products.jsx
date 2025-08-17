/* eslint-disable no-unused-vars */
import axios from "axios";

import React, { useEffect, useState } from "react";

const Products = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (response.data.success) {
        setSuppliers(response.data.suppliers);
        setCategories(response.data.categories);
        setProducts(response.data.products);
        setFilteredproducts(response.data.products);
      } else {
        console.error("Error fetching products:", response.data.message);

        alert("Error fetching products. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = (product) => {
    setOpenModal(true);
    setEditProduct(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId?._id || "",
      supplierId: product.supplierId?._id || "",
    });
    //
    // setEditproduct(product);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete)
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Product deleted successfully!");
          fetchProducts(); // Refresh the product list
        } else {
          console.error("Error deleting product:", response.data);
          alert("Error deleting product. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert(
          "An error occurred while deleting the product. Please try again."
        );
      }
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      supplierId: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProduct) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/product/${editProduct}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("Product updated successfully!");
          fetchProducts();
          setOpenModal(false);
          setEditProduct(null);
          setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            supplierId: "",
          });
        } else {
          alert("Error updating product. Please try again.");
        }
      } catch (error) {
        alert(
          "An error occurred while updating the product. Please try again."
        );
      }
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/product/add",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          alert("Products added successfully!");
          fetchProducts();
          setOpenModal(false);
          setFormData({
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: "",
            productId: "",
          });
        } else {
          console.error("Error adding product:", response.data.message);
          alert("Error adding product. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form. Please try again.");
      }
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.trim() === "") {
      // Show all suppliers if search box is empty
      setFilteredproducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchTerm)
      );
      setFilteredproducts(filtered);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Product Management</h1>
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
            // setEditproduct(null);
            setOpenModal(true);
          }}
        >
          Add Product
        </button>
      </div>

      <div>
        <table className="mt-6 w-full text-sm text-center shadow-lg rounded-lg overflow-hidden hover:scale-[1.01]">
          <thead className="bg-gradient-to-r from-green-500 via-emerald-600 to-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Serial No</th>
              <th className="px-4 py-3">Product Name</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Supplier Name</th>
              <th className="px-4 py-3">Price ($)</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredproducts &&
              filteredproducts.map((product, index) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {product.categoryId?.categoryName || "N/A"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {product.supplierId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 font-semibold">
                    {product.price}
                  </td>
                  <td className="px-4 py-3">
                    {product.stock === 0 ? (
                      <span className="text-red-700 bg-red-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.stock}
                      </span>
                    ) : product.stock < 5 ? (
                      <span className="text-yellow-700 bg-yellow-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.stock}
                      </span>
                    ) : (
                      <span className="text-green-700 bg-green-200 px-3 py-1 rounded-full text-xs font-semibold">
                        {product.stock}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded-lg shadow-sm hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition-all duration-200 cursor-pointer"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {filteredproducts.length === 0 && (
          <div className="text-center mt-4">No products found</div>
        )}
      </div>

      {openModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-md w-1/4 relative">
            <h1 className="text-xl font-bold mb-4">Add Products</h1>

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
                placeholder="Product Name"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter Price"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Enter Stock"
                className="border p-1 bg-white rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="w-full border rounded shadow-md  ">
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full p-2"
                >
                  <option value="">Select Category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.categoryName}
                      </option>
                    ))}
                </select>
              </div>

              <div className="w-full border rounded shadow-md">
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleChange}
                  className="w-full p-2"
                >
                  <option value="">Select Supplier</option>
                  {suppliers &&
                    suppliers.map((supplier) => (
                      <option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </option>
                    ))}
                </select>
              </div>

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
                  {editProduct ? "Save Changes" : "Save"}
                </button>

                <button
                  type="button"
                  className="w-full rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600 "
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product list table */}
    </div>
  );
};

export default Products;
