/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const Summary = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    totalStocks: 0,
    ordersToday: 0,
    revenue: 0,
    outOfStocks: [],
    highestSaleProduct: null,
    lowStockProducts: [],
  });

  const [Loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/dashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      setDashboardData(response.data.dashboardData);
      //   if (!response.ok) {
      //     throw new Error("Failed to fetch dashboard data");
      //   }
      //   const data = await response.json();
      //   setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (Loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (

    <div className="p-5 ">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
        <div className="bg-blue-500 text-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center hover:scale-[1.02]">
          <p className="text-2xl font-semibold">Total Products</p>
          <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
        </div>
        <div className="bg-pink-500 text-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center hover:scale-[1.02]">
          <p className="text-2xl font-semibold">Total Stocks</p>
          <p className="text-2xl font-bold">{dashboardData.totalStocks}</p>
        </div>
        <div className="bg-yellow-500 text-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center hover:scale-[1.02]">
          <p className="text-2xl font-semibold">Orders Today</p>
          <p className="text-2xl font-bold">{dashboardData.ordersToday}</p>
        </div>
        <div className="bg-purple-500 text-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center hover:scale-[1.02]">
          <p className="text-2xl font-semibold">Revenue</p>
          <p className="text-2xl font-bold">$ {dashboardData.revenue}</p>
        </div>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Out of Stocks
          </h3>
          {dashboardData.outOfStocks.length > 0 ? (
            <ul className="list-disc pl-5">
              {dashboardData.outOfStocks.map((product, index) => (
                <li key={index} className="text-gray-700">
                  {product.name}{" "}
                  <span className="text-red-500">
                    ({product.categoryId?.categoryName || "No Category"})

                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No products out of stock.</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Highest Sale Product
          </h3>
          {dashboardData.highestSaleProduct?.name ? (
            <div className="text-gray-700">
              <p>
                <strong>Name: </strong>
                {dashboardData.highestSaleProduct.name}
              </p>
              <p className="text-gray-600">
                <strong>Categoty: </strong>
                {dashboardData.highestSaleProduct.category}
              </p>
              <p>
                <strong>Total Units Sold: </strong>
                {dashboardData.highestSaleProduct.totalQuantity}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">
              {dashboardData.highestSaleProduct?.message || "Loading..."}
            </p>
          )}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Low Stock Products
          </h3>

          {dashboardData.lowStockProducts.length > 0 ? (
            <ul className="list-disc pl-5">
              {dashboardData.lowStockProducts.map((product, index) => (
                <li key={index} className="text-gray-700">
                  <strong> {product.name}</strong> - {product.stock} left{" "}
                  <span className="text-gray-500">
                    ({product.categoryId?.categoryName || "No Category"})
                  </span>
                </li>
              ))}
            </ul> 
          ) : (
            <p className="text-gray-600">No low stock products.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
