import HomeStack from "./stacks/HomeStack";
import ExploreStack from "./stacks/ExploreStack";
import ProfileStack from "./stacks/ProfileStack";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

function App() {
  const renderTabBarBackground = (props) => (
    <LinearGradient
      colors={["#181818", "rgba(24, 24, 24, 0.85)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.tabBarGradient}
    >
      <View style={styles.tabBarBackground}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = props.state.index === index;

          const onPress = () => {
            const event = props.navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            props.navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          let iconName;
          if (route.name === "Home") {
            iconName = isFocused ? "home" : "home";
          } else if (route.name === "Explore") {
            iconName = isFocused ? "compass" : "compass";
          } else if (route.name === "Profile") {
            iconName = isFocused ? "user-circle" : "user-circle";
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarItem}
              key={route.key}
            >
              <Icon
                name={iconName}
                size={24} // Adjust the icon size here
                color={isFocused ? "#39C61C" : "white"}
                style={'solid'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused ? "home" : "home";
              } else if (route.name === "Explore") {
                iconName = focused ? "compass" : "compass";
              } else if (route.name === "Profile") {
                iconName = focused ? "user" : "user";
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: "#39C61C",
            tabBarInactiveTintColor: "white",
            tabBarShowLabel: false,
          })}
          tabBar={renderTabBarBackground}
        >
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Explore" component={ExploreStack} />
          <Tab.Screen name="Profile" component={ProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarBackground: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarGradient: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ffff',
    paddingLeft: 30,
    paddingRight: 30
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
