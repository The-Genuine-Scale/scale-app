import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { getProductsByCategory } from "../api/product";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";

const ProductListScreen = ({ route }) => {
  const { categoryData } = route.params;
  const [productList, setProductList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProductsByCategory();
  }, []);

  const fetchProductsByCategory = async () => {
    try {
      const products = await getProductsByCategory(categoryData);
      setProductList(products);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.docId)}
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
      <TouchableOpacity style={styles.wishlistButton}>
        <Text style={styles.wishlistIcon}>♡</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const ProductList = () => {
    return (
      <>
        <CustomHeader  signout={true} />
        <FlatList
          style={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
          data={productList}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.docId.toString()}
          numColumns={2}
        />
      </>
    );
  };
  const handleProductPress = (docId) => {
    navigation.navigate("SingleProductScreen", { docId });
  };

  return (
    <ImageBackground
      source={require("../assets/gradient.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          ListHeaderComponent={<ProductList />}
          ListFooterComponent={<View style={styles.bottomSpace} />}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSpace: {
    height: 60,
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
    bottom: 10,
    right: 10,
    backgroundColor: "transparent",
  },
  wishlistIcon: {
    fontSize: 20,
    color: "white",
  },
});

export default ProductListScreen;
