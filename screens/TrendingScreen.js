import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { getIsTrendingProducts, getProductsByCategory } from "../api/product";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import ProductCard from "../components/ProductCard";
import { retrieveData } from "../localstorage/localstorage";
import { getWishlistItems } from "../api/wishlist";

const TrendingScreen = () => {
  const [productList, setProductList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  const fetchProducts = async () => {
    try {
      const products = await getIsTrendingProducts();
      const userId = await retrieveData("uid");
      const wishlist = await getWishlistItems(userId);
      const updatedProductList = products.map((product) => ({
        ...product,
        inWishlist: wishlist?.some((item) => item.productId === product.docId),
      }));
      setProductList(updatedProductList);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
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
            data={productList}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                inWishlist={item.inWishlist}
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

export default TrendingScreen;
