const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute'); // Đường dẫn đến file định tuyến người dùng
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

const app = express();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors()); // Cho phép CORS
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ yêu cầu
app.use(bodyParser.urlencoded({ extended: true })); // Phân tích dữ liệu URL-encoded

// Định tuyến
app.use('/register', userRoutes); // Đảm bảo rằng các yêu cầu đến /register được xử lý đúng

// Cấu hình cổng và khởi chạy server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
