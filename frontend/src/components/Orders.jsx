/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import axios from 'axios';

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
      <h1 className="text-2xl font-bold">Orderst</h1>

      <div>
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">S. No</th>
              <th className="border border-gray-300 p-2">order Name</th>
              <th className="border border-gray-300 p-2">Category Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Total Price in ($)</th>
              <th className="border border-gray-300 p-2">Date</th>
               
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{order.product.name}</td>
                  <td className="border border-gray-300 p-2">
                    {order.product.categoryId?.categoryName || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.quantity || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {order.totalPrice}
                    </td>
                  <td className="border border-gray-300 p-2">
                    {/* {order.orderDate} */}

                    {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}
                   
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center mt-4">No orders found</div>
        )}
      </div>
  
    </div>
  );
};  

export default Orders;