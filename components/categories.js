import {
  View, Text, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { useState } from 'react';
import { featured } from '../constansts';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);
  return (
    <View className="mt-4">
      <ScrollView
          // className="p-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          className="overflow-visible"
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
      >
          {
            featured.products.map((product, index) => {
              const isActive = product._id === activeCategory;
              const btnClass = isActive ? ' bg-gray-100' : ' bg-gray-200';
              const textClass = isActive ? ' font-semibold text-gray-800' : ' text-gray-500';
              return (
                <View key={index} className="flex justify-center items-center mr-6">
                  <TouchableOpacity
                    onPress={() => setActiveCategory(product._id)}
                    className={`p-1 squared-full shadow bg-gray-200${btnClass}`}>
                        <Image style={{ width: 45, height: 45 }} source={product.image}
                    />
                  </TouchableOpacity>
                  <Text className={`text-sn${textClass}`}>{product.name}</Text>
                </View>
              );
            })
          }

      </ScrollView>
    </View>

  );
}
