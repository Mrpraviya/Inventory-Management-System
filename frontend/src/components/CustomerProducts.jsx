/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredproducts, setFilteredproducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [orderData, SetOrderData] = useState({
    productId: "",
    quantity: 1,
    total: 0,
    stock: 0,
    price: 0,
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (response.data.success) {
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

  const handleChangeCategory = (e) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId === "") {
      // Reset to all products
      setFilteredproducts(products);
    } else {
      setFilteredproducts(
        products.filter(
          (product) => product.categoryId?._id === selectedCategoryId
        )
      );
    }
  };

  const handleOrderChange = (product) => {
    SetOrderData({
      productId: product._id,
      quantity: 1,
      total: product.price,
      stock: product.stock,
      price: product.price,
    });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders/add",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );
      if (response.data.success) {
        // Update product stock in state (no need to re-fetch everything)
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod._id === orderData.productId
              ? { ...prod, stock: prod.stock - orderData.quantity }
              : prod
          )
        );

        setFilteredproducts((prevFiltered) =>
          prevFiltered.map((prod) =>
            prod._id === orderData.productId
              ? { ...prod, stock: prod.stock - orderData.quantity }
              : prod
          )
        );

        setOpenModal(false);
        SetOrderData({
          productId: "",
          quantity: 1,
          total: 0,
          stock: 0,
          price: 0,
        });

        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    }
  };

  const increaseQuantity = (e) => {
    if (e.target.value > orderData.stock) {
      alert("Not engough stock.!");
    } else {
      SetOrderData((prev) => ({
        ...prev,
        quantity: parseInt(e.target.value),
        total: parseInt(e.target.value) * parseInt(orderData.price),
      }));
    }
  };

  return (
    <div>
      <div className="py-4 px-6">
        <h1 className="text-xl font-bold ">Products</h1>
      </div>
      <div className="flex justify-between items-center py-4 px-6">
        <div>
          <select
            name="category"
            id=""
            className="border p-1 bg-white rounded px-4"
            onChange={handleChangeCategory}
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search here"
            className="border p-1 bg-white rounded px-4"
            onChange={handleSearch}
          />
        </div>
      </div>

      <div>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S. No</th>
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Category Name</th>
              <th className="border border-gray-300 p-2">Price in ($)</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredproducts &&
              filteredproducts.map((product, index) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{product.name}</td>
                  <td className="border border-gray-300 p-2">
                    {product.categoryId?.categoryName || "N/A"}
                  </td>

                  <td className="border border-gray-300 p-2">
                    {product.price}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <span className="font-semibold rounded-full">
                      {product.stock == 0 ? (
                        <span className="text-red-600 bg-red-200 px-2 py-1 rounded-full">
                          {product.stock}
                        </span>
                      ) : product.stock < 5 ? (
                        <span className="text-yellow-600 bg-yellow-200 px-2 py-1 rounded-full">
                          {product.stock}
                        </span>
                      ) : (
                        <span className="text-green-600 bg-green-200 px-2 py-1 rounded-full">
                          {product.stock}
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600 cursor-pointer"
                      onClick={() => handleOrderChange(product)}
                    >
                      Order
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
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-20">
          <div className="bg-white p-4 rounded shadow-md w-1/3 relative">
            <h1 className="text-xl font-bold mb-4">Place Order</h1>

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
                type="number"
                name="quantity"
                value={orderData.quantity}
                onChange={increaseQuantity}
                min="1"
                placeholder="Increase Quantity"
                className="border p-1 bg-white rounded px-4"
              />

              <p>{orderData.quantity * orderData.price}</p>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="w-full rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600"
                >
                  Save Changes
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
    </div>
  );
};

export default CustomerProducts;
