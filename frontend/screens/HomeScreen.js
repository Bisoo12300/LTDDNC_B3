import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const logo = require("../assets/logo1.jpg"); // Đảm bảo đường dẫn đúng

const HomeScreen = () => {
  const articles = [
    { id: '1', title: 'Article 1', summary: 'This is a summary of the first article.' },
    { id: '2', title: 'Article 2', summary: 'This is a summary of the second article.' },
    { id: '3', title: 'Article 3', summary: 'This is a summary of the third article.' },
  ];

  // Hàm để hiển thị mỗi mục trong danh sách
  const renderArticle = ({ item }) => (
    <View style={tw`bg-gray-100 p-4 mb-4 rounded-lg shadow`}>
      <Text style={tw`text-lg font-bold mb-2`}>{item.title}</Text>
      <Text style={tw`text-base text-gray-700`}>{item.summary}</Text>
      <TouchableOpacity style={tw`mt-2 bg-blue-500 p-2 rounded-lg`} onPress={() => alert(`Read more about ${item.title}`)}>
        <Text style={tw`text-white text-center`}>Read More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>Welcome to HomeScreen!</Text>
      <Image
        source={logo} // Sử dụng logo từ require
        style={tw`w-full h-64 rounded-lg shadow-lg mb-4`}
      />
      <Text style={tw`text-base text-gray-700 mb-4 text-center`}>
        This is a list of articles. Click on "Read More" to read the full article.
      </Text>
      
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;
