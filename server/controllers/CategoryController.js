import Category from "../models/Category.js";
import ProductModel from "../models/Product.js"; 

const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    const existingCategory = await Category.findOne({
      categoryName,
      categoryDescription,
    });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category already exists" });
    }

    // Create a new category
    const newCategory = new Category({
      categoryName,
      categoryDescription,
    });
    await newCategory.save();
    return res
      .status(201)
      .json({ success: true, message: "Category added successfully" });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting categories" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName, categoryDescription } = req.body;

    const existingCategory = await Category.findById(id);

    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { categoryName, categoryDescription },
      { new: true }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "Category updated successfully",
        category: updateCategory,
      });
  } catch (error) {
    console.error("Error updating category:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in updating category" });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const productCount = await ProductModel.countDocuments({ categoryId: id });

    if (productCount > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot delete category with associated products",
        });
    }
    
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in deleting category" });
  }
};

export { addCategory, getCategories, updateCategory, deleteCategory };
