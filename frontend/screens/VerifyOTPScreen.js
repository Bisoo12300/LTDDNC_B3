import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { verifyOTP } from '../utils/api'; // Giả sử bạn có một API utils để gọi API xác thực OTP

const VerifyOTPScreen = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    try {
      // Giả sử bạn có một hàm verifyOTP trong api.js
      const response = await verifyOTP(otp);

      if (response.success) {
        Alert.alert('Success', 'OTP verified successfully.');
        navigation.navigate('HomeScreen'); // Chuyển hướng đến màn hình chính sau khi xác thực thành công
      } else {
        Alert.alert('Verification Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during OTP verification.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={(text) => setOtp(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerifyOTPScreen;
