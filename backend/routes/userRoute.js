const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Đường dẫn tới userController.js
const verifyToken = require('../middleware/verifyToken'); // Đường dẫn tới verifyToken.js
app.use(express.json()) 

// Đăng ký người dùng mới
router.post('/register', userController.registerUser);

// Đăng nhập người dùng
router.post('/login', userController.loginUser);

// Lấy thông tin người dùng (cần xác thực)
router.get('/profile', verifyToken, userController.getUserProfile);

// Cập nhật thông tin người dùng (cần xác thực)
router.put('/profile', verifyToken, userController.updateUserProfile);

// Xóa người dùng (cần xác thực)
router.delete('/profile', verifyToken, userController.deleteUserProfile);

module.exports = router;
