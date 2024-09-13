const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
    userID: String,
    otp: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
});

const UserOTPVerification = mongoose.model('UserOTPVerification', UserOTPVerificationSchema);

module.exports = UserOTPVerification;