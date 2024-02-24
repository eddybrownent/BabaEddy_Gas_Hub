import { useState, useEffect, useRef } from 'react';
import {
  View, Text, Image, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Linking, DrawerLayoutAndroid, ImageBackground, Alert,
} from 'react-native';
import * as Icon from 'react-native-feather';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import OrderOptions from '../components/orderOptions';
import { featured } from '../constansts';
import customAnimationJson from '../assets/images/gasAnimation.json';
import { useAuthentication } from '../context/useAuthentication';

function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, logout } = useAuthentication();
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const drawerRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  // Simulate loading delay with setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Adjust duration
    return () => clearTimeout(timer);
  }, []);

  const handlePhoneCall = () => {
    const phoneNumber = '0722477345'; // phone number to call
    Linking.openURL(`tel:${phoneNumber}`);
  };

  if (loading) {
    return (
            <View backgroundColor={themeColors.bgColor(1)} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                {/* Render Lottie animation for loading */}
                <LottieView
                    source={customAnimationJson} // Provide your custom animation JSON file
                    autoPlay={true}
                    style={{ width: 300, height: 200 }}
                />
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>BabaEddy_Gas Delivery</Text>
                </View>
            </View>
    );
  }

  return (

        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={200}
            drawerPosition={'left'}
            renderNavigationView={() => (
                <View style={{ flex: 1, backgroundColor: 'white' }}>

                    {/* Your drawer content */}
                    <ImageBackground source={require('../assets/images/orback.jpg')} style={{ flex: 1, padding: 20 }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../assets/images/user.png')} style={{ height: 100, width: 100 }} />
                                <View className="pt-10">
                                 <Text className="text-white font-bold text-xl">Profile: </Text>
                                    <Text className="text-white font-bold text-lg pt-5">{user?.username || "UserName"}</Text>
                                    <Text className="text-white font-bold text-lg pt-3">{user?.phoneNumber || "Phone number"}</Text>
                                    <Text className="text-white font-bold text-lg pt-3">{user?.address || "Location"}</Text>
                                </View>
                        </View>
                    </ImageBackground>
                    <View>
                    <TouchableOpacity
                        onPress={() => {
                          if (isAuthenticated) {
                            Alert.alert(
                              'Log Out',
                              'Are you sure you want to Log out?',
                              [
                                {
                                  text: 'Cancel',
                                  style: 'cancel',
                                },

                                {
                                  text: 'Log Out',
                                  onPress: handleLogout,
                                  style: 'destructive',
                                },
                              ],
                            );
                          } else {
                            // login action here, navigating to the login screen
                            navigation.navigate('Login');
                          }
                        }}
            style={{ alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}
        >
            {isAuthenticated ? (
                <>
                    <Icon.LogOut color="orange" size={25} />
                    <Text style={{ color: 'orange', fontSize: 16 }}> Log Out </Text>
                </>
            ) : (
                <>
                    <Icon.LogIn color="orange" size={25} />
                    <Text style={{ color: 'orange', fontSize: 16 }}> Log In </Text>
                </>
            )}
        </TouchableOpacity>
</View>
                </View>
            )}
        >
        <SafeAreaView style={{ paddingTop: 10 }} className="flex-1 bg-#ebcdbc">
            <StatusBar barStyle="light-content" backgroundColor="#fc8128" />
            <View className="flex-row items-center space-x-2 px-4 pb-4">

                <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
                    <TouchableOpacity onPress={handlePhoneCall}>
                    <Icon.PhoneCall fill={themeColors.bgColor(1)} stroke={themeColors.bgColor(1)} strokeWidth="1" width="30" />
                    </TouchableOpacity>
                    <Text className="text-gray-600"> Call Our Helpline</Text>
                    <View className="flex-row items-center space-x-1 border-0  pl-2 border-l-gray-300">
                        <Icon.HelpCircle fill={themeColors.bgColor(1)} height="20" width="20" stroke="white" />
                        <Text className="text-gray-600">Kiambu, Thika</Text>
                    </View>
                </View>

                <View>
    {isAuthenticated ? (
        <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Log Out',
                'Are you sure you want to Log out?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {
                    text: 'Log Out',
                    onPress: handleLogout,
                    style: 'destructive',
                  },
                ],
              );
            }}
            style={{ backgroundColor: themeColors.bgColor(1), padding: 12, borderRadius: 9999 }}
        >
            <Icon.LogOut height={20} width={20} strokeWidth="2.5" stroke="white" />
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
              // handling user icon press when not authenticated
              // add alert here !!
            }}
            style={{ backgroundColor: themeColors.bgColor(1), padding: 12, borderRadius: 9999 }}
        >
            <Icon.User height={20} width={20} strokeWidth="2.5" stroke="white" />
        </TouchableOpacity>
    )}
</View>

            </View>

            <View className="mt-4">
                <Text className="text-1xl tracking-widest font-medium ml-5 text-gray-600">Hello, welcome..</Text>
                <Text className="text-2xl font-semibold ml-5">BabaEddy_Gas Home Delivery</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 0,
                  paddingBottom: 20,
                }}>
                {/* categories */}
                <Categories />

                {/* featured */}
                <FeaturedRow shop={featured.shop} />

                {/* Render OrderOptions outside the map function */}
                <OrderOptions shop={featured.shop} products={featured.products} />
            </ScrollView>
        </SafeAreaView>
        </DrawerLayoutAndroid>
  );
}

export default HomeScreen;
