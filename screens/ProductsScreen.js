import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Icon from "react-native-feather";
import { themeColors } from '../theme';
import { featured } from '../constansts';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../components/cartIcon';
import React, { useEffect, useLayoutEffect, useMemo} from 'react'
import { selectCartproducts, addToCart, removeFromCart, selectCartproductsById } from '../slices/cartSlice';

function ProductsScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { params } = useRoute();
    const { shop, products } = params;

    // Select cart products based on the product IDs
    const getItemQuantityInCart = (productId) => {
        const itemInCart = useSelector(state => selectCartproductsById(state, productId));
        return itemInCart ? itemInCart.length : 0;
    };

    const handleIncrease = (productId, name, price, image, description) => {
        dispatch(addToCart({ id: productId, name, price, image, description }));
    }

    const handleDecrease = (productId) => {
        dispatch(removeFromCart({ id: productId }))
    }

    return (
        <View style={{flex: 1}}>
        <CartIcon shop={shop} />
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
            {/* Your ScrollView content */}
            <View className="relative">
                <Image style={{ width: '100%', height: 200 }} source={require('../assets/images/LPG.png')} />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ position: 'absolute', top: 10, left: 10 }}>
                    <Icon.ArrowLeft strokeWidth={3} stroke={"white"} />
                </TouchableOpacity>
            </View>
            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'white', marginTop: -60, paddingTop: 20 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Choose Products</Text>
                    <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 5 }}>Thank you for choosing us! We're delighted to serve you with free home delivery.</Text>
                </View>
                <View style={{ padding: 20 }}>
                    {products.map((product) => (
                        <View key={product.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Image source={product.image} style={{ width: 95, height: 95, borderRadius: 10 }} />
                            <View style={{ flex: 1, marginLeft: 15 }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{product.name}</Text>
                                <Text style={{ fontSize: 16 }}>Ksh {product.price}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => handleDecrease(product.id)}
                                    disabled={(!getItemQuantityInCart(product.id))}
                                    style={{ backgroundColor: themeColors.bgColor(1), padding: 10, borderRadius: 20 }}>
                                    <Icon.Minus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                                <Text style={{ paddingHorizontal: 10 }}>{getItemQuantityInCart(product.id)}</Text>
                                <TouchableOpacity
                                    onPress={() => handleIncrease(product.id, product.name, product.price, product.image, product.description)}
                                    style={{ backgroundColor: themeColors.bgColor(1), padding: 10, borderRadius: 20 }}>
                                    <Icon.Plus strokeWidth={2} height={20} width={20} stroke="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    </View>
    );
}

export default ProductsScreen;