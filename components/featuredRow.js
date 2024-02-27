import {
  View, Text, ScrollView, TouchableOpacity,
} from 'react-native';
import { themeColors } from '../theme';
import GasDeliveryShop from './gasdeliveryShop';

function FeaturedRow({ title, description, shop }) {
  return (
        <View>
            <View className="flex-row justify-between items-center px-3">
                <View>
                    <Text className="font-bold text-lg">{title}</Text>
                    <Text className="text-gray-500 text-xs">{description}</Text>
                </View>

                <TouchableOpacity>
                    <Text style={{ color: themeColors.text }} className="font-semibold">Swipe to see all</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="overflow-visible px-6"
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
            >
                <GasDeliveryShop
                    shop = {shop}
                />
            </ScrollView>
        </View>
  );
}

export default FeaturedRow;
