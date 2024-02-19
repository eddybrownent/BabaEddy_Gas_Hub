import React from 'react'
import { View, Text, SafeAreaView, TextInput, StatusBar, ScrollView} from 'react-native';
import * as Icon from "react-native-feather"
import { themeColors } from '../theme';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import OrderOptions from '../components/orderOptions';
import { featured } from '../constansts';

function HomeScreen() {
    return (
        <SafeAreaView style={{ paddingTop: 10 }} className="flex-1 bg-white">
            <StatusBar barStyle="light-content" backgroundColor="#fc8128" />
            <View className="flex-row items-center space-x-2 px-4 pb-4">
                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <Icon.Search height="25" width="25" stroke="gray" />
                    <TextInput placeholder='Products' className="ml-2 flex-1" />
                    <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                        <Icon.MapPin height="20" width="20" stroke="gray" />
                        <Text className="text-gray-600">Kiambu, Thika</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: themeColors.bgColor(1) }} className="p-3 rounded-full">
                    <Icon.Sliders height={20} width={20} strokeWidth="2.5" stroke="white" />
                </View>
            </View>

            <View className="mt-4">
                <Text className="text-1xl tracking-widest font-medium ml-5">Hello, Welcome to</Text>
                <Text className="text-2xl font-semibold ml-5">BabaEddy_Gas Home Delivery</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 0,
                    paddingBottom: 20
                }}>
                {/* categories */}
                <Categories />

                {/* featured */}
                <FeaturedRow shop={featured.shop} />

                {/* Render OrderOptions outside the map function */}
                <OrderOptions shop={featured.shop} products={featured.products} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default HomeScreen;
