import {
  View, Text, Image, TouchableWithoutFeedback,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';

function GasdeliveryShop({ shop }) {
  return (
        <TouchableWithoutFeedback>
        <View style={{ shadowColor: themeColors.bgColor(0.2), shadowRadius: 7 }} className="mr-6 bg-white rounded-3xl shadow-lg">
        <Image
            className="h-40 w-100 rounded-t-3xl"
            source={require('../assets/images/LPG.png')} // Specify the path to your image
            style={{ width: 300, height: 100 }} // Adjust the width and height of the image
        />
        <View className="px-3 space-y-2">
        <Text className="text-gray-700 text-sm">{shop.description}</Text>
          <View className="flex-row items-center space-x-1">
              <Image source={require('../assets/images/fullStar.png')} className="h-4 w-4" />
              <Text className="text-xs">
                  <Text className="text-green-700">{shop.stars}</Text>
                  <Text className="text-gray-700"> ({shop.reviews} review)</Text> · <Text className="font-semibold text-gray-700">Gas Delivery</Text>
              </Text>
          </View>
          <View className="flex-row items-center space-x-1">
              <Icon.MapPin color="gray" width={15} height={15} />
              <Text className="text-gray-700 text-xs"> Nearby · {shop.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default GasdeliveryShop;
