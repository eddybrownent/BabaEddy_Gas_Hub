import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native'
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setPreviousOrder } from '../slices/cartSlice';


function OrderOptions({ products }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const previousOrder = useSelector(state => state.cart.previousOrder);

    const handleRepeatOrder = () => {
        if (previousOrder) {
          dispatch(setPreviousOrder(previousOrder)); // Dispatch action to set the previous order
          navigation.navigate('Cart'); // Navigate to the confirmation screen
        }
      };

    return (
        <View>
            <View style={{backgroundColor: themeColors.bgColor(0.5)}} className=" p-6 px-8 rounded-t-3xl space-y-4">
            <View>
                <TouchableOpacity 
                style={{backgroundColor: themeColors.bgColor(1)}} 
                className="p-3 rounded-full"
                onPress={()=>{
                    navigation.navigate('Products', { products })
                  }}>
                    <Text className="text-white text-center font-bold text-lg">Place New Order</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                onPress={handleRepeatOrder}
                style={{backgroundColor: themeColors.bgColor(1)}}  
                className="p-3 rounded-full"
                >
                    <Text className="text-white text-center font-bold text-lg">Repeat previous Order</Text>
                </TouchableOpacity>
            </View>
            
            </View>
        </View>
    );
};

export default OrderOptions;
