const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,  // Ensure email is unique
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    phone: {
        type: String,
        required: [false],  // Optional field
        match: [/^\d{10}$/, "Please enter a valid phone number"] // Example validation
    },
    address: {
        type: String,
        required: [false],  // Optional field
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true }); // Enables createdAt and updatedAt

module.exports = mongoose.model("UserModel", userSchema);
