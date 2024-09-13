import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import tw from 'tailwind-react-native-classnames'; 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CustomButton } from '../components';

type RootStackParamList = {
  ForgotPassword: undefined;
  Login: undefined;
  OTPVerificationScreen: undefined;
};

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = async () => {
    setEmailError('');
    setIsSubmitting(true);

    // Kiểm tra email trống
    if (!email) {
      setEmailError('Email is required');
      setIsSubmitting(false);
      return;
    }

    // Gửi yêu cầu khôi phục mật khẩu (bạn cần tích hợp với Firebase hoặc server backend)
    try {
      // Giả lập gửi yêu cầu
      await new Promise(resolve => setTimeout(resolve, 1000)); // Thay thế bằng logic thực tế
      alert('Check your email for password reset instructions');
      setIsSubmitting(false);
      navigation.navigate('OTPVerificationScreen');
    } catch (error) {
      setEmailError('Failed to send password reset email');
      setIsSubmitting(false);
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('OTPVerificationScreen');
  };

  return (
    <View style={tw`px-5 flex-1 bg-white pt-5`}>
      <Text style={tw`text-4xl font-bold text-start`}>
        Forgot Password
      </Text>
      <View style={tw`mt-8`}>
        <TextInput
          placeholder="Enter your email"
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={tw`text-red-500 mt-2`}>{emailError}</Text> : null}

        <CustomButton
          title="Send Reset Email"
          handlePress={handleForgotPassword}
          isLoading={isSubmitting}
          containerStyle={tw`mt-7 py-5`}
        />
      </View>

      <View style={tw`mt-8 flex flex-row justify-center`}>
        <Text style={tw`text-lg`}>Remembered your password?</Text>
        <TouchableOpacity onPress={handleNavigateToLogin}>
          <Text style={tw`text-lg font-bold underline text-action ml-2`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
