 
//  import category from "../models/Category.js";
// import Supplier from "../models/Supplier.js";
// import Product from "../models/Product.js";
// const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, stock, categoryId, supplierId } = req.body;

//     // Create a new product
//     const newProduct = new Product({
//         name,
//         description,
//         price,
//         stock,
//         categoryId,
//         supplierId
//     });

//     await newProduct.save();
//     return res
//       .status(201)
//       .json({ success: true, message: "Product added successfully" });
//   } catch (error) {
//     console.error("Error adding Product:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     const suppliers = await Supplier.find({});
//     const categories = await category.find({});
//     return res.status(200).json({ success: true, suppliers, categories });
//   } catch (error) {
//     console.error("Error fetching supplier:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error in getting suppliers" });
//   }
// };

// export { getProducts, addProduct };

// ##############################################################

import Category from "../models/Category.js";
import Supplier from "../models/Supplier.js";
import Product from "../models/Product.js";
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, supplierId } = req.body;

    // Create a new product
    const newProduct = new Product({
        name,
        description,
        price,
        stock,
        categoryId,
        supplierId
    });

    await newProduct.save();
    return res
      .status(201)
      .json({ success: true, message: "Product added successfully", Product: newProduct });
  } catch (error) {
    console.error("Error adding Product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({isDeleted: false})
    .populate({path: "categoryId", select: "categoryName"})
    .populate({path: "supplierId", select: "name "});

    const suppliers = await Supplier.find({});
    const categories = await Category.find({});

    return res.status(200).json({ success: true, products, suppliers, categories });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting products" });
  }
}; 

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, supplierId } = req.body;

    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stock, categoryId, supplierId },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "Product updated successfully", Product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ success: false, message: "Server error in updating product" });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID and mark it as deleted
    const existongProduct = await Product.findById(id);
    if (!existongProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (existongProduct.isDeleted) {
      return res.status(400).json({ success: false, message:  "product already deleted" });
    }

    await Product.findByIdAndUpdate(id, { isDeleted: true });

    return res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ success: false, message: "Server error in deleting product" });
  } 
}


export { getProducts, addProduct, updateProduct, deleteProduct };

