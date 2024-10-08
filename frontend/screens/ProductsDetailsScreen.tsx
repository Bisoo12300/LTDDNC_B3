import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
// Define RouteStackParamList directly in this file if it's not available in '../../App'
type RouteStackParamList = {
  ProductDetails: { itemDetails: any };
  Cart: { itemDetails: any };
};
import {icons} from '../constants';
import {RouteTabsParamList} from './HomeScreen';
import LinearGradient from 'react-native-linear-gradient';
import {FeaturesData} from '../tabs/HomeTab';
import {ProductItem} from '../components';
import {ProductData} from '../constants/data';
import tw from 'tailwind-react-native-classnames'; 

type ScreenRouteProps = RouteProp<RouteStackParamList, 'ProductDetails'>;

type ProductDetailsProps = {
  route: ScreenRouteProps;
};

const ProductsDetailsScreen: React.FC<ProductDetailsProps> = ({route}) => {
  const {itemDetails} = route.params || {};
  const navigation =
    useNavigation<StackNavigationProp<RouteTabsParamList, 'Cart'>>();

  const GoBack = () => {
    navigation.goBack();
  };
  const NavigateToCart = () => {
    navigation.navigate('Cart', {itemDetails: itemDetails!});
  };
  return (
    <ScrollView style={tw`pt-5 px-3`}>
      {/* header */}
      <View style={tw`flex flex-row justify-between items-center`}>
        <TouchableOpacity onPress={GoBack}>
          <Image
            source={icons.next1}
            style={tw`rotate-180 w-8 h-8`}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={NavigateToCart}>
          <Image source={icons.cart} style={tw`w-6 h-6`} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      {/* image slider */}
      <View style={tw`mt-5`}>
        <Image
          source={{uri: itemDetails?.image[0]}}
          style={tw`h-72 rounded-2xl`}
        />
      </View>
      {/* size uk */}
      <View>
        <Text style={tw`text-black-100 text-lg font-bold`}>Size: 7UK</Text>
        <View style={tw`flex flex-row gap-x-5 mt-5 items-center`}>
          {sizeData.map(item => (
            <View
              key={item.id}
              style={tw`bg-transparent py-1 px-2 rounded-lg border border-red-500`}>
              <Text style={tw`text-action text-xl font-medium`}>
                {item.size} uk{' '}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {/* details */}
      <View style={tw`mt-5`}>
        <Text style={tw`text-2xl font-bold text-black-100`}>
          {' '}
          {itemDetails?.title}{' '}
        </Text>
        <Text style={tw`text-neutral-400 font-medium text-lg`}>
          {' '}
          Vision Alta Men’s Shoes Size (All Colours){' '}
        </Text>
        <View style={tw`flex flex-row items-center mb-3`}>
          <View>
            <AirbnbRating
              count={itemDetails?.stars}
              reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
              defaultRating={itemDetails?.stars}
              size={20}
              ratingContainerStyle={{flex: 1, flexDirection: 'row'}}
            />
          </View>

          <Text style={tw`text-xl font-thin text-black-100/90`}>
            {' '}
            {itemDetails?.numberOfReview}{' '}
          </Text>
        </View>
        <View style={tw`flex flex-row items-center gap-x-3`}>
          <Text style={tw`text-black-100 font-bold text-2xl text-start`}>
            {' '}
            ${itemDetails?.price}{' '}
          </Text>
          <Text style={tw`text-black-100/50 font-thin text-xl line-through text-start`}>
            {' '}
            {itemDetails?.priceBeforeDeal}{' '}
          </Text>
          <Text style={tw`text-action font-thin text-xl`}>
            {' '}
            {itemDetails?.priceOff}{' '}
          </Text>
        </View>
        <View style={tw`mt-3`}>
          <Text style={tw`text-xl font-semibold text-black-100`}>
            Product Details
          </Text>
          <Text style={tw`text-md font-medium text-neutral-400`}>
            {itemDetails?.description}
          </Text>
        </View>
        {/* status */}
        <View style={tw`flex flex-row items-center gap-x-3 mt-5`}>
          <FlatList
            data={StatusData}
            renderItem={({item}) => (
              <View style={tw`bg-transparent py-1 px-2 border flex flex-row gap-x-1 rounded-lg border-neutral-500`}>
                <Image
                  style={tw`w-6 h-6`}
                  resizeMode="contain"
                  source={item.icon}
                />
                <Text style={tw`text-neutral-400 font-medium text-lg`}>
                  {' '}
                  {item.name}{' '}
                </Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={tw`w-3`} />}
          />
        </View>
        {/* go to cart/ buy now */}
        <View style={tw`flex flex-row gap-x-5 items-center mt-5`}>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`z-20`}>
              <Image
                source={icons.cart_circle}
                style={tw`w-12 h-12 -mr-1`}
                resizeMode="contain"
              />
            </View>
            <View style={tw`bg-blue-600 py-[6px] px-4 -ml-4 rounded-xl z-10`}>
              <Text style={tw`text-white font-medium text-2xl`}>
                {' '}
                Go To Cart{' '}
              </Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center`}>
            <View style={tw`z-20`}>
              <Image
                source={icons.buy}
                style={tw`w-12 h-12 -mr-1`}
                resizeMode="contain"
              />
            </View>
            <View style={tw`bg-green-500 py-[6px] px-4 -ml-4 rounded-xl z-10`}>
              <Text style={tw`text-white font-medium text-2xl`}>
                {' '}
                Go To Cart{' '}
              </Text>
            </View>
          </View>
        </View>
        {/* delivery in ... */}
        <View style={tw`bg-red-300 px-3 py-3 my-5`}>
          <Text style={tw`text-black-100 text-lg`}>Delivery in </Text>
          <Text style={tw`text-black-100 text-2xl font-bold`}>
            1 within Hour
          </Text>
        </View>
        {/* View similar */}
        <View style={tw`flex flex-row items-center justify-between mb-8`}>
          <FlatList
            data={similarData}
            renderItem={({item}) => (
              <View style={tw`bg-white py-3 px-3 rounded-lg border border-neutral-200 flex flex-row gap-x-2`}>
                <Image
                  source={item.icon}
                  style={tw`w-6 h-6`}
                  resizeMode="contain"
                />
                <Text style={tw`text-black-100 text-xl font-medium`}>
                  {' '}
                  {item.name}{' '}
                </Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={tw`w-3`} />}
          />
        </View>
        {/* similar to */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-2xl text-black-100 font-bold text-start`}>
            Similar To
          </Text>
          {/* features */}
          <View style={tw`flex my-5 flex-row mx-5 justify-between`}>
            <Text style={tw`text-2xl font-bold`}>282+ Items </Text>
            <View style={tw`flex flex-row gap-x-3`}>
              {FeaturesData.map(item => (
                <View
                  style={tw`bg-white rounded-lg flex-row flex items-center px-2`}
                  key={item.id}>
                  <Text style={tw`text-black-100`}> {item.title} </Text>
                  <Image
                    source={item.image}
                    style={tw`w-4 h-4`}
                    resizeMode="contain"
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* similar products */}
        <View style={tw`my-8`}>
          <FlatList
            data={itemDetails ? [itemDetails] : []}
            renderItem={({item}) => (
              <ProductItem
                image={item.image[0]}
                title={item.title}
                description={item.description}
                price={item.price}
                priceBeforeDeal={item.priceBeforeDeal}
                priceOff={item.priceOff}
                stars={item.stars}
                numberOfReview={item.numberOfReview}
                itemDetails={item}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={tw`w-8`} />}
            ListFooterComponent={<View style={tw`w-8`} />}
            ListHeaderComponent={<View style={tw`w-8`} />}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductsDetailsScreen;

interface similarDataType {
  icon: ImageSourcePropType;
  name: string;
}

const similarData: similarDataType[] = [
  {
    icon: icons.eye,
    name: 'View Similar',
  },
  {
    icon: icons.components,
    name: 'Add to Compare',
  },
];

const sizeData = [
  {
    id: 0,
    size: 6,
  },
  {
    id: 1,
    size: 7,
  },
  {
    id: 2,
    size: 8,
  },
  {
    id: 3,
    size: 9,
  },
  {
    id: 4,
    size: 10,
  },
];
interface StatusDataType {
  id: number;
  icon: ImageSourcePropType;
  name: string;
}

const StatusData: StatusDataType[] = [
  {
    id: 0,
    icon: icons.lock,
    name: 'Nearest Store',
  },
  {
    id: 1,
    icon: icons.lock,
    name: 'VIP',
  },
  {
    id: 2,
    icon: icons.lock,
    name: 'Return policy',
  },
];
