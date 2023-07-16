import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { retrieveData } from "../localstorage/localstorage";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WishlistScreen from "../screens/WishlistScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import CustomHeader from "../components/CustomHeader";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderHistoryScreen from "../screens/OrderHistoryScreen";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
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
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
