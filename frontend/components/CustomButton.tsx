import {View, Text, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames'; 

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  testStyles?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyle,
  testStyles,
  isLoading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        tw`bg-action rounded-xl w-full flex flex-row justify-center items-center`,
        containerStyle,
        isLoading ? tw`opacity-50` : null
      ]}
      disabled={isLoading}>
      <Text style={[tw`text-white font-bold text-2xl`, textStyle]}>
        {title}
      </Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={'#fff'}
          style={tw`ml-2`}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
