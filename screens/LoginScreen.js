import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { themeColors } from '../theme';
import Animated, { FadeIn, FadeOut, FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAuthentication } from "../context/useAuthentication";


function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const {login} = useAuthentication();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // Perform login authentication using Firebase
      // For example:
      await login(email, password);
      
      // For the sake of simulation, let's assume the login is successful
      // Once the login is successful, navigate to the OrderPreparingScreen or any other screen
      navigation.navigate('Cart');
    } catch (error) {
      // Handle login error (e.g., display error message to the user)
      setError(error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <View className="bg-white h-full w-full">
      <Image className="h-full w-full absolute" source={require('../assets/images/web.png')} />

      {/* lights */}
      <View className="flex-row justify-around w-full absolute"></View>

      {/* title and form */}
      <View className="h-full w-full flex justify-around">
        {/* Title */}
        <View className="flex items-center">
          <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
            Login
          </Animated.Text>
        </View>

        {/* form */}
        <View className="flex items-center mx-4 space-y-4">
          <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
            <TextInput placeholder='Email' placeholderTextColor={'white'} value={email} onChangeText={setEmail} style={{ color: 'white' }} />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mb-3">
            <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ color: 'white' }} />
          </Animated.View>
        <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text className="text-orange-600 justify-left">{showPassword ? 'Hide' : 'Show'} Password</Text>
        </TouchableOpacity>
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
            <TouchableOpacity
              className="w-full, p-3 rounded-2xl mb-3"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleLogin}>
              <Text className="text-xl font-bold text-white text-center">Login</Text>
            </TouchableOpacity>
          </Animated.View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
          <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('Signup')}>
              <Text className="text-orange-600">SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

export default LoginScreen;
