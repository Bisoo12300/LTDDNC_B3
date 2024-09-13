import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import tw from 'tailwind-react-native-classnames';
//import { getUserProfile, updateUserProfile } from '../utils/api'; // Giả sử bạn có các hàm API để lấy và cập nhật thông tin người dùng

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  useEffect(() => {
    // Fetch user profile on component mount
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.success) {
          setName(response.data.name);
          setEmail(response.data.email);
          setPhone(response.data.phone);
        } else {
          Alert.alert('Error', response.message);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile.');
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await updateUserProfile({ name, email, phone });
      if (response.success) {
        Alert.alert('Success', 'Profile updated successfully.');
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Profile</Text>
      
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={tw`border border-gray-300 rounded-lg p-2 mb-4`}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      
      <TouchableOpacity style={tw`bg-blue-500 p-4 rounded-lg`} onPress={handleSave}>
        <Text style={tw`text-white text-center text-lg font-bold`}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
