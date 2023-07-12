import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { handleSignOut } from "../api/auth";

const CustomHeader = (prop) => {
  const navigation = useNavigation();

  const handleSignOutPress = () => {
    console.log('hehe')
    handleSignOut(navigation);
  };
  console.log(prop.signout, 'hweh')
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      {prop.signout===true ? (
        <TouchableOpacity
          onPress={handleSignOutPress}
          style={styles.headerButton}
        >
          <Icon name="sign-out" size={30} color="black" />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    margin: 20,
  },
  headerLogo: {
    width: 150,
    height: 41,
    marginLeft: -15,
  },
};

export default CustomHeader;
