import { View, Image } from 'react-native';
import { useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartproducts } from '../slices/cartSlice';
import { useAuthentication } from '../context/useAuthentication';

export default function OrderPreparing() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const cartItems = useSelector(selectCartproducts);
  const { user } = useAuthentication();

  useEffect(() => {
    if (isFocused && cartItems.length > 0 && user) {
      // Fetch user data
      setTimeout(() => {
        navigation.navigate('Confirmation', {
          cartItems,
          phoneNumber: user.phoneNumber,
          address: user.address,
          username: user.username,
        });
      }, 3000);
    }
  }, [isFocused, navigation, cartItems, user]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Image source={require('../assets/images/deli.gif')} />
    </View>
  );
}
