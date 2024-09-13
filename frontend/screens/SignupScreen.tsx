import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'tailwind-react-native-classnames';
import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton, FormField } from '../components';
import { icons } from '../constants';

type Props = {};

const SignupScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  type RootStackParamList = {
    ForgotPassword: undefined;
    Login: undefined;
    OTPVerificationScreen: { email: string };
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignInWithProvider = () => {};

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  const handlerSignup = async () => {
    setIsSubmitting(true);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Kiểm tra các trường hợp trống hoặc lỗi
    if (!form.email || !form.username || !form.password || !form.confirmPassword) {
      if (!form.email) setEmailError('Email is required');
      if (!form.username) setPasswordError('Username is required');
      if (!form.password) setPasswordError('Password is required');
      if (!form.confirmPassword) setConfirmPasswordError('Confirm Password is required');
      setIsSubmitting(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      // Gửi thông tin đăng ký tới API
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        // Điều hướng tới màn hình xác thực OTP và truyền email
        navigation.navigate('OTPVerificationScreen', { email: form.email });
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={tw`px-5 flex-1 bg-white pt-5`}>
      <Text style={tw`text-4xl font-bold text-start`}>
        Create an
        {'\n'} account
      </Text>
      <View>
        {/* text input */}
        <FormField
          title="Email"
          value={form.email}
          setError={setEmailError}
          error={emailError}
          handleChangeText={(e: any) => {
            setEmailError('');
            setForm({ ...form, email: e });
          }}
          placeholder="username or email"
          otherStyles="my-5"
        />
        <View>
          <FormField
            title="Username"
            value={form.username}
            setError={setPasswordError}
            error={passwordError}
            handleChangeText={(e: any) => {
              setPasswordError('');
              setForm({ ...form, username: e });
            }}
            placeholder="Username"
            otherStyles="mt-5"
          />
          <FormField
            title="Password"
            value={form.password}
            setError={setPasswordError}
            error={passwordError}
            handleChangeText={(e: any) => {
              setPasswordError('');
              setForm({ ...form, password: e });
            }}
            placeholder="Password"
            otherStyles="mt-5"
          />
          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            setError={setConfirmPasswordError}
            error={confirmPasswordError}
            handleChangeText={(e: any) => {
              setConfirmPasswordError('');
              setForm({ ...form, confirmPassword: e });
            }}
            placeholder="Confirm Password"
            otherStyles="mt-5"
          />

          <Text style={tw`text-[#676767] text-lg font-medium self-end`}>
            By clicking the <Text style={tw`text-red-600`}> Register</Text>{' '}
            button, you agree to the public offer
          </Text>
        </View>
        {/* submit btn */}
        <CustomButton
          title="Register"
          handlePress={handlerSignup}
          isLoading={isSubmitting}
          containerStyle={tw`mt-7 py-5`}
        />
        {/* or continue with  */}
        <View style={tw`mt-5 self-center`}>
          <Text style={tw`text-[#575757] text-lg self-center mt-5`}>
            {' '}
            - OR Continue with -{' '}
          </Text>
          <View style={tw`flex flex-row items-center gap-3 mt-5 justify-between`}>
            {ContinueWithData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={handleSignInWithProvider}
                  style={tw`rounded-full border-2 bg-red-50 border-red-500 p-4`}>
                  <Image
                    source={item.image}
                    style={tw`w-8 h-8`}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={tw`flex flex-row items-center gap-x-2 justify-center mt-8`}>
            <Text style={tw`text-[#575757] text-xl`}>
              I Already Have an Account
            </Text>
            <TouchableOpacity onPress={handleNavigateToLogin}>
              <Text style={tw`text-xl font-bold underline text-action`}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

type ContinueWithType = {
  image: ImageSourcePropType | undefined;
  id: number;
  name: string;
};

const ContinueWithData: ContinueWithType[] = [
  {
    id: 0,
    name: 'google',
    image: icons.google,
  },
  {
    id: 1,
    name: 'apple',
    image: icons.apple,
  },
  {
    id: 2,
    name: 'facebook',
    image: icons.facebook,
  },
];
