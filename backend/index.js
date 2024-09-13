const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const productRoute = require('./routes/productsRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoute); // Sửa đường dẫn route cho sản phẩm
app.use('/api/users', userRoute); // Thêm route cho user

// Connect to MongoDB
const PORT = process.env.PORT || 4000; // Sử dụng biến môi trường PORT nếu có
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://thaison123456xyz:phAn11%4010@cluster0.fwx2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));
