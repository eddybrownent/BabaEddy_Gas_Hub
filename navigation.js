// eslint-disable-next-line no-unused-vars
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductsScreen from './screens/ProductsScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import OrderPreparing from './screens/OrderPreparing';
import DeliveryScreen from './screens/DeliveryScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

// eslint-disable-next-line no-unused-vars
const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Cart" options={{ presentation: 'modal' }} component={CartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OrderPreparing" options={{ presentation: 'modal' }} component={OrderPreparing} />
        <Stack.Screen name="Confirmation" options={{ presentation: 'modal' }} component={ConfirmationScreen} />
        <Stack.Screen name="DeliveryScreen" options={{ presentation: 'modal' }} component={DeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
