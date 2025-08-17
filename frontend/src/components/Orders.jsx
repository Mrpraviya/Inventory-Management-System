/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setorders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
        },
      });
      if (response.data.success) {
        setorders(response.data.orders);
      } else {
        console.error("Error fetching orders:", response.data.message);

        alert("Error fetching orders. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-full h-full p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Customer Order List...</h1>

      <div>
        <table className="mt-6 w-full text-sm text-center shadow-lg rounded-lg overflow-hidden hover:scale-[1.01] transition-transform duration-200">
          <thead className="bg-gradient-to-r from-green-500 via-emerald-600 to-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Serial No</th>
              <th className="px-4 py-3">Order Name</th>
              <th className="px-4 py-3">Category Name</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Total Price ($)</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {orders &&
              orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                >
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {order.product.name}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {order.product.categoryId?.categoryName || "N/A"}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {order.quantity || "N/A"}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    {order.totalPrice}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-700">
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center mt-4">No Orders Found</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
