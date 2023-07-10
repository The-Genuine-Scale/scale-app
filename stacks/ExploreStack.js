import { useNavigation } from "@react-navigation/native";
import ExploreScreen from "../screens/ExploreScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ExploreStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{
            headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}
