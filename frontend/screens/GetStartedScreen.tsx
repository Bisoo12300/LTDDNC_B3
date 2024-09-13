import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { images } from '../constants';
import { CustomButton } from '../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import tw from 'tailwind-react-native-classnames';

type Props = {};

const GetStartedScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  type RootStackParamList = {
    Login: undefined;
    HomeScreen: undefined;
  };

  const GetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={images.get_started}
      style={tw`w-full h-full flex-1`}>
      <View style={tw`h-[60vh]`} />
      <View style={tw`px-3 h-[40vh] pt-3 shadow-md bg-black-100/30 w-full`}>
        <Text style={tw`text-white text-4xl text-center font-bold`}>
          You want Authentic, here you go!
        </Text>
        <Text style={tw`text-white text-lg font-medium text-center mt-3`}>
          Find it here, buy it now!
        </Text>

        <CustomButton
          title="Get Started"
          containerStyle={tw`py-4 my-8`}
          handlePress={GetStarted}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStartedScreen;
