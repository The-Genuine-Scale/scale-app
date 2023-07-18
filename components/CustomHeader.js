import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { handleSignOut } from "../api/auth";
import { MaterialIcons } from "@expo/vector-icons";

const CustomHeader = (prop) => {
  const navigation = useNavigation();

  const handleSignOutPress = () => {
    handleSignOut(navigation);
  };
  const handleWishlist = () => {
    navigation.navigate('WishlistScreen')
  };
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      {prop.signout === true ? (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={handleWishlist}
          >
            <MaterialIcons
              name={"favorite-border"}
              size={24}
              color={"#39C61C"}
              style={styles.wishlistButton}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignOutPress}
            style={styles.headerButton}
          >
            <Icon name="sign-out" size={25} color="black" />
          </TouchableOpacity>
        </View>
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
    margin: 10,
  },
  headerLogo: {
    width: 150,
    height: 41,
    marginLeft: -15,
  },
  wishlistButton: {
    height: 25,
    backgroundColor: "transparent",
    marginRight: 10,
  },
};

export default CustomHeader;
