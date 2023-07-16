// ProductCard.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { retrieveData } from "../localstorage/localstorage";
import { handleWishlist } from "../api/wishlist";

const ProductCard = ({ item, onPress, inWishlist, onPressWishlist }) => {
  const navigation = useNavigation();
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const handleProductPress = () => {
    navigation.navigate("SingleProductScreen", { docId: item.docId });
  };
  const handleAddToWishlist = async () => {
    try {
      const userId = await retrieveData("uid");
      if (userId === null) {
        navigation.navigate("LoginScreen");
      }
      await handleWishlist(userId, item.docId);
      setIsInWishlist(!isInWishlist);
      if (onPressWishlist) {
        onPressWishlist();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={onPress ? onPress : handleProductPress}
    >
      <Image
        source={{ uri: item.imgUrl[0] }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productOverlay}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>&#8377;{item.price}</Text>
        </View>
        <Text style={styles.sellerName}>{item.seller}</Text>
      </View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={handleAddToWishlist}
      >
        <MaterialIcons
          name={isInWishlist ? "favorite" : "favorite-border"}
          size={24}
          color={isInWishlist ? "#39C61C" : "#ffff"}
          style={styles.wishlistButton}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    aspectRatio: 0.7,
  },
  productImage: {
    flex: 1,
  },
  productOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    justifyContent: "space-between",
  },
  productInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
  productName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sellerName: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
    marginBottom: 0,
  },
  wishlistButton: {
    height: 25,
    position: "absolute",
    bottom: 3,
    right: 5,
    backgroundColor: "transparent",
  },
});

export default ProductCard;
