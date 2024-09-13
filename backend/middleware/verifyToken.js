const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

// Middleware xác thực JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Lấy token từ chuỗi 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Xác thực token với secret key từ biến môi trường
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào request
    next(); // Cho phép tiếp tục các hành động khác
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
