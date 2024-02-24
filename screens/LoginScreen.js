import { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { useAuthentication } from '../context/useAuthentication';
import { themeColors } from '../theme';

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      // Perform login authentication using Firebase
      setLoading(true);
      await login(email, password);

      // Once the login is successful, navigate to HomeScreen
      navigation.navigate('Home');
    } catch (error) {
      // login error
      setError(error.message);
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
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
            <TextInput placeholder='Password' placeholderTextColor={'white'} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} style={{ color: 'white' }} />
          </Animated.View>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {showPassword ? (
                <Icon.EyeOff width={20} height={20} stroke="orange" strokeWidth="2.5"/>
            ) : (
                <Icon.Eye width={20} height={20} stroke="orange" strokeWidth="2.5" />
            )}
        </TouchableOpacity>
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
          {
          loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity
              className="w-full, p-3 rounded-2xl mb-3"
              style={{ backgroundColor: themeColors.bgColor(1) }}
              onPress={handleLogin}>
              <Text className="text-xl font-bold text-white text-center">Login</Text>
            </TouchableOpacity>
          )
          }
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
