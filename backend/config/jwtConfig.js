const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

// Hàm để tạo JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token có hiệu lực trong 1 giờ
  });
};

// Hàm xác thực JWT (middleware)
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = { generateToken, verifyToken };
