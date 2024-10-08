import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import tw from 'tailwind-react-native-classnames';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomButton, FormField} from '../components';
import {icons} from '../constants';

type Props = {};

const LoginScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
  });
  type RootStackParamList = {
    ForgotPassword: undefined;
    Signup: undefined;
  OTPVerificationScreen: { email: string };
};
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = async () => {
    setIsSubmitting(true);
  
    // Kiểm tra các trường hợp trống hoặc lỗi
    if (!form.email || !form.password) {
      if (!form.email) setEmailError('Email is required');
      if (!form.password) setPasswordError('Password is required');
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Gửi email OTP tới API
      const response = await fetch('http://localhost:4000/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form.email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('OTP sent to email');
  
        // Điều hướng tới màn hình xác thực OTP và truyền email
        navigation.navigate('OTPVerificationScreen', { email: form.email });
      } else {
        alert('Failed to send OTP: ' + data.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSignInWithProvider = () => {};
  const handleNavigateToSignUp = () => {
    navigation.navigate('Signup');
  };
  return (
    <View style={tw`px-5 flex-1 bg-white pt-5`}>
      <Text style={tw`text-4xl font-bold text-start`}>
        Welcome {'\n'} Back!
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
            setForm({...form, email: e});
          }}
          placeholder="username or email"
          otherStyles="my-5"
        />
        <View>
          <FormField
            title="Password"
            value={form.password}
            setError={setPasswordError}
            error={passwordError}
            handleChangeText={(e: any) => {
              setPasswordError('');
              setForm({...form, password: e});
            }}
            placeholder="Password"
            otherStyles="mt-5"
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={tw`text-red-600 text-lg font-medium self-end`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        {/* submit btn */}
        <CustomButton
          title="Login"
          handlePress={handleLogin}
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
            <Text style={tw`text-[#575757] text-xl`}>Create An Account</Text>
            <TouchableOpacity onPress={handleNavigateToSignUp}>
              <Text style={tw`text-xl font-bold underline text-action`}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
