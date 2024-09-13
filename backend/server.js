const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Đường dẫn đến file db.js
const verifyToken = require('./middleware/verifyToken'); // Đường dẫn tới verifyToken.js

const userRoute = require('./routes/userRoute'); // Đường dẫn tới userRoute.js

// app.use('/api/users', userRoute);
// // Load cấu hình từ .env
// dotenv.config();

// Kết nối tới MongoDB
connectDB();

// Khởi tạo ứng dụng Express
const app = express();

// Middleware để parse JSON
app.use(express.json());

// Example route không yêu cầu xác thực
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example route yêu cầu xác thực
app.get('/protected', verifyToken, (req, res) => {
  res.send(`Welcome, user with ID: ${req.user.id}`);
});

// Định nghĩa cổng từ .env hoặc mặc định là 5000
const PORT = process.env.PORT || 4000;

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
