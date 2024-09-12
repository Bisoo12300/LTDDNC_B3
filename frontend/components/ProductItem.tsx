import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ItemDetails, ProductTypes} from '../constants/types';
import {images} from '../constants';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../screens/OnboardingScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteStackParamList} from '../../App';
import tw from 'tailwind-react-native-classnames'; 

type ProductItemProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  priceBeforeDeal: number;
  priceOff: string;
  stars: number;
  numberOfReview: number;
  ukSide?: number[];
  itemDetails: ItemDetails;
};

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  title,
  description,
  price,
  priceBeforeDeal,
  priceOff,
  stars,
  numberOfReview,
  itemDetails,
}) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList, 'ProductDetails'>>();
  const NavigateToProductsDetails = () => {
    navigation.navigate('ProductDetails', {itemDetails});
  };

  return (
    <TouchableOpacity
      style={tw`w-72 bg-white rounded-xl`}
      onPress={NavigateToProductsDetails}>
      <Image source={{uri: image}} style={tw`w-full rounded-t-xl h-40`} />
      <View style={tw`px-3`}>
        <Text style={tw`text-3xl text-black-100 my-2 text-start font-bold`}>
          {title}
        </Text>
        <Text style={tw`text-xl text-black-100/50 text-start font-medium`}>
          {description}
        </Text>
        <Text style={tw`text-black-100 font-bold text-2xl text-start`}>
          {' '}
          ${price}{' '}
        </Text>
        <View style={tw`flex flex-row items-center gap-x-3`}>
          <Text style={tw`text-black-100/50 font-thin text-xl line-through text-start`}>
            {' '}
            {priceBeforeDeal}{' '}
          </Text>
          <Text style={tw`text-action font-thin text-xl`}> {priceOff} </Text>
        </View>
        <View style={tw`flex flex-row items-center mb-3`}>
          <View>
            <AirbnbRating
              count={stars}
              reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
              defaultRating={stars}
              size={20}
              ratingContainerStyle={{flex: 1, flexDirection: 'row'}}
            />
          </View>

          <Text style={tw`text-xl font-thin text-black-100/90`}>
            {' '}
            {numberOfReview}{' '}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;
