const mongoose = require('mongoose');
const UserModel = require('../models/userModel'); // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn
const { sign } = require('jsonwebtoken');

/**
 * getAllUsers,
 * getSingleUser,
 * signUp,
 * updateUser,
 * deleteUser
 */

// Get all users
const signUp = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Create the user
        const newUser = await UserModel.create({
            name, email, password, phone, address
        });
        return res.status(201).json(newUser);
    } catch (error) {
        let errorMessage = "";
        if (error.errors) {
            errorMessage = Object.values(error.errors).map(error => error.message).join(", ");
        } else {
            errorMessage = error.message;
        }
        res.status(500).json({ error: errorMessage });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "No such ID" });
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!updatedUser) {
            return res.status(400).json({ error: "Couldn't Update the User, make sure you filled the required fields" });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "No Such ID" });
        }
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User Not Found" });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signUp,
    updateUser,
    deleteUser
};
