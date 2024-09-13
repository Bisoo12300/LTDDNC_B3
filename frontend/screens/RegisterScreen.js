import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
  if (!email || !name || !phone || !password || !confirmPassword) {
    Alert.alert('Error', 'Please fill all fields.');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match.');
    return;
  }

  try {
    const response = await fetch('http://10.0.2.2:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,       
        email: email,     
        phone: phone,     
        password: password, 
      }),
    });

    const data = await response.json();
    if (response.ok) {
      Alert.alert('Success', 'Registration successful');
      navigation.navigate('LoginScreen');
    } else {
      Alert.alert('Registration Failed', data.message);
    }
  } catch (error) {
    Alert.alert('Error', `An error occurred: ${error.message}`);
    console.error(error);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Already have an account? Login</Text>
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

export default RegisterScreen;
