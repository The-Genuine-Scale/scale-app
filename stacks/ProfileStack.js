import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { retrieveData } from "../localstorage/localstorage";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WishlistScreen from "../screens/WishlistScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import CustomHeader from "../components/CustomHeader";

const Stack = createStackNavigator();

export default function ProfileStack() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const checkUid = async () => {
      const storedUid = await retrieveData("uid");
      setUid(storedUid);
    };

    checkUid();
  }, []);

  if (uid === null) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
            options={{
              headerShown: false
            }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
            options={{
              headerShown: false
            }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
            options={{
              headerShown: false
            }}
      />
    </Stack.Navigator>
  );
}
