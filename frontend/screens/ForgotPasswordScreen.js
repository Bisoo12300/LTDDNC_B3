import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { sendPasswordResetEmail } from '../utils/api'; // Giả sử bạn có một API utils để gọi API gửi email khôi phục mật khẩu

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      // Giả sử bạn có một hàm sendPasswordResetEmail trong api.js
      const response = await sendPasswordResetEmail(email);

      if (response.success) {
        Alert.alert('Success', 'Password reset email sent.');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Reset Failed', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while sending the reset email.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Back to Login</Text>
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
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007BFF',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default ForgotPasswordScreen;
