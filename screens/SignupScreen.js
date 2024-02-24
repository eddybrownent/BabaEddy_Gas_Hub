import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { useAuthentication } from '../context/useAuthentication';

function SignupScreen() {
  const navigation = useNavigation();
  const { signup } = useAuthentication();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      await signup(email, password, phoneNumber, address, username);
      // Signup successful, navigate to login
      navigation.navigate('Login');
    } catch (error) {
      // Signup failed, handle error
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white h-full w-full pt-20">
      <Image className="h-full w-full absolute" source={require('../assets/images/web.png')} />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute"></View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-10
      ">
        {/* Title */}
        <View className="flex items-center">
        <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">Sign Up</Animated.Text>
        </View>

        <View className="flex items-center mx-4 space-y-3 pt-30">
        <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Username' placeholderTextColor={'white'} value={username} onChangeText={setUsername} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Email' placeholderTextColor={'white'} value={email} onChangeText={setEmail} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput placeholder='Password' placeholderTextColor={'white'} secureTextEntry value={password} onChangeText={setPassword} />
        </Animated.View>
        {/* Add phone number input */}
        <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Phone Number' placeholderTextColor={'white'} value={phoneNumber} onChangeText={setPhoneNumber} />
        </Animated.View>
        {/* Add address input */}
        <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Address' placeholderTextColor={'white'} value={address} onChangeText={setAddress} />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(1200).duration(1000).springify()}className="w-full">
        {
          loading ? (
            <ActivityIndicator />
          ) : (
          <TouchableOpacity
            onPress={handleSignup}
            className="w-full, p-3 rounded-2xl mb-3"
            style={{ backgroundColor: themeColors.bgColor(1) }}>
            <Text className="text-xl font-bold text-white text-center">SignUp</Text>
          </TouchableOpacity>
          )
          }
          </Animated.View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <Animated.View entering={FadeInDown.delay(1200).duration(1000).springify()}className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text className="text-orange-600">Login</Text>
            </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
  );
}

export default SignupScreen;
