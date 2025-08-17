import Product from "../models/Product.js";
import OrderModel from "../models/Order.js";

const getData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const stockResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStocks: { $sum: "$stock" },
        },
      },
    ]);

    const totalStocks = stockResult[0]?.totalStocks || 0;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); 
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const ordersToday = await OrderModel.countDocuments({
      orderDate: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const revenueResult = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const revenue = revenueResult[0]?.totalRevenue || 0;

    const outOfStocks = await Product.find({ stock: 0 })
      .select("name stock")
      .populate("categoryId", "CategoryName");

    const highestSaleResult = await OrderModel.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $lookup: {
          from: "categories",
          localField: "productDetails.categoryId",
          foreignField: "_id",
          as: "productDetails.categoryId",
        },
      },
      { $unwind: "$productDetails.categoryId" },
      {
        $project: {
          name: "$productDetails.name",
          category: "$productDetails.categoryId.categoryName",
          totalQuantity: 1,
        },
      },
    ]);

    const highestSaleProduct = highestSaleResult[0] || {
      message: "No sales data available",
    };

    const lowStockProducts = await Product.find({ stock: { $gt: 0, $lt: 5 } })
      .select("name stock")
      .populate("categoryId", "categoryName");

    const dashboardData = {
      totalProducts,
      totalStocks,
      ordersToday,
      revenue,
      outOfStocks,
      highestSaleProduct,
      lowStockProducts,
    };
    return res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res
      .status(500)
      .json({ success: false, message: "error fetching dashboard summary" });
  }
};

export { getData };
