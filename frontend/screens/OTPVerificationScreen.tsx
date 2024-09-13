import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { CustomButton } from '../components'; // Assuming you already have a CustomButton component
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  OTPVerification: undefined;
  Home: undefined; // Điều hướng đến trang chủ sau khi OTP hợp lệ
};

const OTPVerificationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyOTP = async () => {
    setOtpError('');
    setIsSubmitting(true);

    // Kiểm tra OTP trống
    if (!otp) {
      setOtpError('OTP is required');
      setIsSubmitting(false);
      return;
    }

    // Giả lập yêu cầu xác thực OTP (thay thế bằng logic API thực tế)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Giả lập thời gian chờ
      if (otp === '123456') { // Thay thế bằng OTP thực tế từ server
        alert('OTP is valid. Verification successful!');
        setIsSubmitting(false);
        navigation.navigate('Home'); // Điều hướng về trang chính sau khi xác thực thành công
      } else {
        setOtpError('Invalid OTP');
        setIsSubmitting(false);
      }
    } catch (error) {
      setOtpError('Failed to verify OTP');
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = () => {
    // Giả lập gửi lại OTP
    alert('OTP resent to your email');
  };

  return (
    <View style={tw`px-5 flex-1 bg-white pt-5`}>
      <Text style={tw`text-4xl font-bold text-start`}>
        Verify OTP
      </Text>

      <View style={tw`mt-8`}>
        <TextInput
          placeholder="Enter your OTP"
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={6} // Giới hạn OTP là 6 số
        />
        {otpError ? <Text style={tw`text-red-500 mt-2`}>{otpError}</Text> : null}

        <CustomButton
          title="Verify OTP"
          handlePress={handleVerifyOTP}
          isLoading={isSubmitting}
          containerStyle={tw`mt-7 py-5`}
        />

        <TouchableOpacity onPress={handleResendOTP} style={tw`mt-4`}>
          <Text style={tw`text-red-500 underline`}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPVerificationScreen;
