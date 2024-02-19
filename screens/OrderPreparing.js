import { View, Text, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useIsFocused} from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartproducts } from '../slices/cartSlice';

export default function OrderPreparing() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const cartItems = useSelector(selectCartproducts);

    useEffect(() => {
      if (isFocused && cartItems.length > 0) {
          setTimeout(() => {
              navigation.navigate('DeliveryScreen');
          }, 3000);
      }
  }, [isFocused, navigation]);
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image source={require('../assets/images/deli.gif')} />
    </View>
  )
}