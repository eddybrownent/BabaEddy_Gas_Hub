import React, { useState, useMemo } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { selectCartproducts, selectCartTotal, setPreviousOrder } from '../slices/cartSlice';
import { themeColors } from '../theme';
import { sendEmail } from '../context/sendEmail';

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartproducts);
  const cartTotal = useSelector(selectCartTotal);
  const route = useRoute();
  const { phoneNumber, address, username } = route.params;

  const [groupedProducts, setGroupedProducts] = useState([]);

  // Function to handle email processing
  const handlePayment = async () => {
    const to = 'ekaranja28@gmail.com';
    const subject = 'New Order Confirmation';
    const body = `
  Hello,

  New order details:
  Name: ${username}
  Phone Number: ${phoneNumber}
  Location: ${address}
      
  Order Details:
  ${groupedProducts.map((item) => `- Product: ${item.name}\n  Quantity: ${item.quantity}\n  Price: ${item.price}`).join('\n')}
      
  Total: ${cartTotal}

  Please confirm and process the order. Thank you!
`;

    try {
      await sendEmail(to, subject, body);
      // Dispatch the setPreviousOrder action with the cartItems before navigating
      dispatch(setPreviousOrder(cartItems));
      // Navigate to the delivery screen
      navigation.navigate('DeliveryScreen');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleGoBack = () => {
    // Navigate to a different screen instead of going back to the previous screen
    navigation.navigate('Cart'); // Navigate to the home screen
    // Alternatively, you can perform a different action here
  };

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
      {/* Top button */}
      <View className="relative py-4 shadow-sm">
        <TouchableOpacity onPress={handleGoBack} className="absolute z-10 p-0 shadow top-5 left-2">
          <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.text} />
        </TouchableOpacity>
        <View>
          <Text className="text-center font-bold text-xl">Your Order:</Text>
          <Text className="text-center text-gray-500">BabaEddy_Gas Delivery</Text>
        </View>
      </View>

      {/* Render user details */}
      <View style={{
        margin: 20, padding: 20, borderRadius: 10, backgroundColor: '#fff', elevation: 4,
      }}>
        <Text className="text-center font-bold text-xl">Order Details:</Text>
        <Text className="text-center font-bold text-gray-500">Name: {username}</Text>
        <Text className="text-center font-bold text-gray-500">Phone: {phoneNumber}</Text>
        <Text className="text-center font-bold text-gray-500">Address: {address}</Text>
      </View>

      {/* Render grouped cart items */}
      <ScrollView style={{ flex: 1, padding: 5 }}>
        {groupedProducts.map((product, index) => (
          <View key={`${product.id}-${index}`} className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
            <Text style={{ color: themeColors.text }} className="font-bold">{product.quantity} x </Text>
            <Image source={product.image} className="h-14 w-14 rounded-full"/>
            <Text className="flex-1 font-bold text-gray-700">{product.name}</Text>
            <Text className="font-semibold text-base">Ksh {product.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Total amount */}
      <View style={{ backgroundColor: themeColors.bgColor(0.2) }} className=" p-6 px-8 rounded-t-3xl space-y-4">
        <Text className="text-center font-bold text-xl">Total:</Text>
        <Text className="text-center font-bold text-gray-500 text-xl">Ksh {cartTotal}</Text>

        {/* Proceed to payment button */}
        <View>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-full"
            onPress={handlePayment}
            >
            <Text className="text-white text-center font-bold text-lg">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmationScreen;
