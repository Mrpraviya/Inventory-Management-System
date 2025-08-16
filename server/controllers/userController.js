
import User from "../models/User.js";
import bcrypt, { hash } from "bcrypt";
const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const esUser = await User.findOne({ email });
    if (esUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User added successfully" });
  } catch (error) {
    console.error("Error adding User:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching Users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting Users" });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching User profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in getting User profile" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is stored in req.user
    const { name, email, address, password } = req.body;

    const updatedata = {name, email, address};

    if (password && password.trim() !== "") {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedata.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updatedata,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  }
  catch (error) {
    console.error("Error updating User profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in updating User profile" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting User:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error in deleting User" });
  }
};

export { addUser, getUsers, deleteUser, getUser, updateUserProfile };
