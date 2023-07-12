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

const SingleProductScreen = ({ route }) => {
  const { docId } = route.params;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    fetchProductById();
  }, []);

  const fetchProductById = async () => {
    try {
      const product = await getProductById(docId);
      setProductData(product);
      console.log(product);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  const ProductContainer = () => {
    return (
      productData && (
        <>
          <CustomHeader />
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
                <TouchableOpacity style={styles.wishlistButton}>
                  <MaterialIcons
                    name={
                      productData.inWishlist ? "favorite" : "favorite-border"
                    }
                    size={24}
                    color={productData.inWishlist ? "#39C61C" : "#000000"}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Add to Bag</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
});

export default SingleProductScreen;
