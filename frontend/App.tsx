import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { 
  CheckoutScreen,
  ForgotPasswordScreen,
  GetStartedScreen,
  HomeScreen,
  LoginScreen,
  OnboardingScreen,
  PlaceOrder,
  OTPVerificationScreen,
  ProfileScreen,
  SignupScreen,
  
} from './screens';

type RouteStackParamList = {
  Onboarding: undefined;
  GetStarted: undefined;
  HomeScreen: undefined;
  Login: undefined;
  PlaceOrder: undefined;
  Profile: undefined;
  Signup: undefined;
  Checkout: undefined;
  ForgotPassword: undefined;
  OTPVerificationScreen: undefined;
};

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const Stack = createNativeStackNavigator<RouteStackParamList>();

  //  useEffect(() => {
  //   SplashScreen.hide();
  //  }, []);

  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Onboarding">
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} /> 
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} />
            <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
