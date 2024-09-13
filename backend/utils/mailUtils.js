const nodemailer = require('nodemailer');
require('dotenv').config(); // Để sử dụng biến môi trường từ tệp .env

// Tạo transporter để gửi email
const transporter = nodemailer.createTransport({
  service: 'gmail', // Hoặc một dịch vụ email khác như 'SendGrid', 'Mailgun', etc.
  auth: {
    user: process.env.EMAIL_USER, // Địa chỉ email gửi
    pass: process.env.EMAIL_PASS, // Mật khẩu email gửi
  },
});

// Hàm gửi email xác thực OTP
exports.sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Địa chỉ email gửi
    to,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully.');
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
    throw new Error('Error sending OTP email');
  }
};

// Hàm gửi email thông báo
exports.sendNotificationEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully.');
  } catch (error) {
    console.error('Error sending notification email:', error.message);
    throw new Error('Error sending notification email');
  }
};

// Bạn có thể thêm các hàm gửi email khác ở đây

