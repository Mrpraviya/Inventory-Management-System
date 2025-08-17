import Product from "../models/Product.js";
import Order from "../models/Order.js";
const addOrder = async (req, res) => {
  try {
    const { productId, quantity, total } = req.body;
    const userId = req.user._id;
    const product = await Product.findById({ _id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Insufficient stock" });
    } else {
      product.stock -= parseInt(quantity);
      await product.save();
    }

    const orderObj = new Order({
      customer: userId,
      product: productId,
      quantity,
      totalPrice: total,
    });
    await orderObj.save();

    res
      .status(200)
      .json({ success: true, message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding order" });
  }
};
 
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    let query = {};
    if (req.user.role === "customer") {
      query = { customer: userId };
    }
    const orders = await Order.find(query)
      .populate({
        path: "product",
        populate: { path: "categoryId", select: "categoryName" },
        select: "name price",
      })
      .populate("customer", "name email");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addOrder, getOrders };
