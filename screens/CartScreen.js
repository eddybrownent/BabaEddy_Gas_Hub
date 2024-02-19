import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { selectCartproducts, selectCartTotal, removeFromCart } from '../slices/cartSlice';
import * as Icon from "react-native-feather";

function CartScreen() {
    const navigation = useNavigation();
    const cartItems = useSelector(selectCartproducts);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();
    const deliveryFee = 0;
    const [groupedProducts, setGroupedProducts] = useState([]);

    // Calculate subtotal
    const subtotal = useSelector(selectCartTotal);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    }

    useMemo(() => {
        const gItems = cartItems.reduce((group, product) => {
            if (group[product.id]) {
                group[product.id].quantity += 1;
            } else {
                group[product.id] = { ...product, quantity: 1 };
            }
            return group;
        }, {});
        setGroupedProducts(Object.values(gItems));
    }, [cartItems]);

    return (
        <View className="bg-white flex-1">
            {/* top button */}
            <View className="relative py-4 shadow-sm">
                <TouchableOpacity
                    onPress={navigation.goBack}
                    className="absolute z-10 p-0 shadow top-5 left-2">
                    <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
                </TouchableOpacity>
                <View>
                    <Text className="text-center font-bold text-xl">Your cart</Text>
                    <Text className="text-center text-gray-500">BabaEddy_Gas Delivery</Text>
                </View>
            </View>

            {/* Render grouped cart items */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
                className="bg-white pt-5"
            >
                {groupedProducts.map((product, index) => (
                    <View
                        key={`${product.id}-${index}`}
                        className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md"
                    >
                        <Text style={{color: themeColors.text}} className="font-bold">{product.quantity} x </Text>
                        <Image className="h-14 w-14 rounded-full" source={product.image} style={{ width: 50, height: 50 }} />
                        <Text className="flex-1 font-bold text-gray-700">{product.name}</Text>
                        <Text className="font-semibold text-base">Ksh {product.price}</Text>
                        <TouchableOpacity
                            className="p-1 rounded-full"
                            style={{ backgroundColor: themeColors.bgColor(1) }}
                            onPress={() => handleRemoveFromCart(product.id)}
                        >
                            <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            {/* totals */}
            <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Subtotal</Text>
                    <Text className="text-gray-700">Ksh {subtotal}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700">Free Delivery</Text>
                    <Text className="text-gray-700">{deliveryFee}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="font-extrabold">Order Total</Text>
                    <Text className="font-extrabold">Ksh {cartTotal}</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{ backgroundColor: themeColors.bgColor(1) }}
                        onPress={() => navigation.navigate('OrderPreparing')}
                        className="p-3 rounded-full"
                        disabled={(!cartItems.length)}
                    >
                        <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default CartScreen;
