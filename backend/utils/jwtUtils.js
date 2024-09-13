const jwt = require('jsonwebtoken');
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

// Tạo token JWT
exports.generateToken = (userId) => {
  const payload = {
    id: userId,
  };

  // Tạo token với thời gian sống (expiration) và bí mật (secret)
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Thay đổi thời gian sống nếu cần

  return token;
};

// Xác thực token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin người dùng vào request object để sử dụng trong các route
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};
