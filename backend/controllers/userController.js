const User = require('../models/User'); // Đường dẫn tới model người dùng
const { generateToken } = require('../config/jwtConfig'); // Đường dẫn tới jwtConfig.js

// Đăng ký người dùng mới
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Tạo người dùng mới
    const user = new User({
      name,
      email,
      password, // Mật khẩu cần được mã hóa trước khi lưu vào database
    });

    await user.save();

    // Tạo token cho người dùng mới
    const token = generateToken(user._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user || !await user.matchPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Tạo token
    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lấy thông tin người dùng
exports.getUserProfile = async (req, res) => {
  try {
    // Tìm người dùng theo ID trong token
    const user = await User.findById(req.user.id).select('-password'); // Loại bỏ mật khẩu
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Cập nhật người dùng
    const user = await User.findByIdAndUpdate(req.user.id, { name, email }, { new: true }).select('-password'); // Loại bỏ mật khẩu
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xóa người dùng
exports.deleteUserProfile = async (req, res) => {
  try {
    // Xóa người dùng
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
