import React from "react";
import { StatusBar, View, SafeAreaView, ImageBackground } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import CustomHeader from "../components/CustomHeader";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ProductListScreen from "../screens/ProductListScreen";
import SingleProductScreen from "../screens/SingleProductScreen";
import WishlistScreen from "../screens/WishlistScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ProductListScreen"
            component={ProductListScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="WishlistScreen"
            component={WishlistScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SingleProductScreen"
            component={SingleProductScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="CheckoutScreen"
            component={CheckoutScreen}
            options={{
              headerShown: false,
            }}
          /> */}
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  );
}
