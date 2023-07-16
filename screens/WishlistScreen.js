import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { getProductById, getProductsByCategory } from "../api/product";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import ProductCard from "../components/ProductCard";
import { handleWishlist, getWishlistItems } from "../api/wishlist";
import { retrieveData } from "../localstorage/localstorage";

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlistItems();
    }, [])
  );

  const fetchWishlistItems = async () => {
    try {
      const userId = await retrieveData("uid");
      const items = await getWishlistItems(userId);
      if (userId === null) {
        navigation.navigate("LoginScreen");
      }
      const wishlistItemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return product;
        })
      );
      setWishlist(wishlistItemsWithDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const updateWishlist = (docId) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.docId !== docId
    );
    setWishlist(updatedWishlist);
  };

  return (
    <ImageBackground
      source={require("../assets/gradient.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={wishlist}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                inWishlist={true}
                onPressWishlist={() => updateWishlist(item.docId)}
              />
            )}
            keyExtractor={(item) => item.docId.toString()}
            numColumns={2}
            ListHeaderComponent={<CustomHeader signout={true} />}
            ListFooterComponent={<View style={styles.bottomSpace} />}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottomSpace: {
    height: 100,
  },
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
  wishlistIcon: {
    fontSize: 20,
    color: "white",
  },
});

export default WishlistScreen;
