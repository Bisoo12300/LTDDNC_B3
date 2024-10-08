import { View, Text, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { images } from '../constants';
import { SplashData } from '../constants/data';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setItem } from '../utils/AsyncStorage';
// Define RouteStackParamList within the same file
export type RouteStackParamList = {
  GetStarted: { id: number } | undefined;
};
import tw from 'tailwind-react-native-classnames'; 

type Props = {};

const OnboardingScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList>>();
  
  const handleDone = async () => {
    await setItem('onboarded', 200);
    navigation.navigate('GetStarted'); // on press will navigate to HomeScreen
  };

  return (
    <View style={tw`flex-1`}>
      <Onboarding
        onSkip={handleDone} // when skip or done go to home screen
        onDone={handleDone}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={SplashData[0].image} />,
            title: SplashData[0].title,
            subtitle: SplashData[0].description,
          },
          {
            backgroundColor: '#fff',
            image: <Image source={SplashData[1].image} />,
            title: SplashData[1].title,
            subtitle: SplashData[1].description,
          },
          {
            backgroundColor: '#fff',
            image: <Image source={SplashData[2].image} />,
            title: SplashData[2].title,
            subtitle: SplashData[2].description,
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
