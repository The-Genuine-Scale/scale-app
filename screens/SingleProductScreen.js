import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { getProductById } from "../api/product";
import CustomCarousel from "../components/CustomCarousel";
import { MaterialIcons } from "@expo/vector-icons";
import CustomHeader from "../components/CustomHeader";
import { retrieveData } from "../localstorage/localstorage";
import { getWishlistItems, handleWishlist } from "../api/wishlist";
import { useNavigation } from "@react-navigation/native";
import { addToCart, removeFromCart } from "../api/cart";

const SingleProductScreen = ({ route }) => {
  const { docId } = route.params;
  const [productData, setProductData] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(null);
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchProductById();
  }, []);
  const handleRemoveFromCart = async () => {
    const userId = await retrieveData("uid");
    if (!userId) {
      navigate("LoginScreen");
    }
    try {
      await removeFromCart(userId, docId);
      setQuantity(quantity - 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async () => {
    const userId = await retrieveData("uid");
    console.log(userId);
    if (!userId) {
      navigation.navigate("LoginScreen");
    }
    try {
      const result = await addToCart(userId, docId);
      console.log(result);
      setQuantity(quantity + 1);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBuyNow = async () => {
    const userId = await retrieveData("uid");
    if (!userId) {
      navigation.navigate("LoginScreen");
    }
    if (quantity < 1) {
      setQuantity(1);
      try {
        await addToCart(userId, docId);
      } catch (error) {
        console.log(error);
      }
    }
    navigation.navigate("CheckoutScreen");
  };
  const fetchProductById = async () => {
    try {
      const product = await getProductById(docId);
      const userId = await retrieveData("uid");
      const wishlist = await getWishlistItems(userId);
      const inWishlist = wishlist.some((item) => item.productId === docId);
      setIsInWishlist(inWishlist);
      setProductData(product);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };
  const handleAddToWishlist = async () => {
    try {
      const userId = await retrieveData("uid");
      if (userId === null) {
        navigation.navigate("LoginScreen");
      } else {
        await handleWishlist(userId, docId);
        setIsInWishlist(!isInWishlist);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const ProductContainer = () => {
    return (
      productData && (
        <>
          <CustomHeader signout={true} />
          <View style={styles.container}>
            <CustomCarousel data={productData.imgUrl} />
            <View style={styles.detailsContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.productName}>{productData.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.productPrice}>&#8377;</Text>
                  <Text style={[styles.productPrice, { color: "#39C61C" }]}>
                    {productData.price}
                  </Text>
                </View>
              </View>
              <Text style={styles.productDescription}>
                {productData.description}
              </Text>
              <View style={styles.starsContainer}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={productData.rating}
                  starSize={20}
                  fullStarColor="#FFD700"
                  emptyStarColor="#D3D3D3"
                />
                <Text>{`(x${productData.ordersRated})`}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.wishlistButton}
                  onPress={handleAddToWishlist}
                >
                  <MaterialIcons
                    name={isInWishlist ? "favorite" : "favorite-border"}
                    size={24}
                    color={isInWishlist ? "#39C61C" : "#39C61C"}
                  />
                </TouchableOpacity>
                {quantity > 0 ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={handleRemoveFromCart}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={handleAddToCart}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddToCart}
                  >
                    <Text style={styles.buttonText}>Add to Bag</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
                  <Text style={styles.buttonText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.customizeContainer}>
              <Text style={styles.customizeText}>Customize Your Order</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.findCoBuyerContainer}>
              <Text style={styles.findCoBuyerText}>Find Co-Buyer</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </>
      )
    );
  };

  return (
    <SafeAreaView style={styles.baseContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<ProductContainer />}
        ListFooterComponent={<View style={styles.bottomSpace} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomSpace: {
    marginBottom: 80,
  },
  container: {
    flex: 1,
  },
  detailsContainer: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingRight: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    width: "80%",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "800",
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  wishlistButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#39C61C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  customizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  customizeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  findCoBuyerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  findCoBuyerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  wishlistButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#39C61C",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#39C61C",
    borderRadius: 25,
  },
  quantityButton: {
    padding: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#39C61C",
  },
  quantityText: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#39C61C",
  },
});

export default SingleProductScreen;
