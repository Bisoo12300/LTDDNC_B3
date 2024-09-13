const mongoose = require('mongoose');
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://thaison123456xyz:phan11a10@cluster0.fwx2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Thoát nếu kết nối thất bại
  }
};

module.exports = connectDB;
