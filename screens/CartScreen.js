import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CartCard from "../components/CartCard";
import { retrieveData } from "../localstorage/localstorage";
import { addToCart, getCartItems, removeFromCart } from "../api/cart";
import { getProductById } from "../api/product";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  const navigateToLoginScreen = () => {
    navigation.navigate("LoginScreen");
  };

  useEffect(() => {
    const getUserId = async () => {
      const userId = await retrieveData("uid");
      if (!userId) {
        navigateToLoginScreen();
      } else {
        setUserId(userId);
        fetchCartItems(userId);
        console.log("getUserId", userId);
      }
    };
    getUserId();
  }, [userId]);
  const fetchCartItems = async (userId) => {
    try {
      if (!userId) {
        navigateToLoginScreen();
      } else {
        console.log("fetchCartItems", userId);
        const items = await getCartItems(userId);
        const cartItemsWithDetails = await Promise.all(
          items.map(async (item) => {
            const product = await getProductById(item.productId);
            return { ...product, quantity: item.quantity };
          })
        );
        const updatedCartItems = [...cartItemsWithDetails];
        setCartItems(updatedCartItems);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromCart = async (id) => {
    try {
      await removeFromCart(userId, id);
      const updatedCartItems = cartItems.map((item) => {
        if (item.docId === id) {
          const updatedQuantity = item.quantity - 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      setQuantity(quantity - 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      await addToCart(userId, id);
      const updatedCartItems = cartItems.map((item) => {
        if (item.docId === id) {
          const updatedQuantity = item.quantity + 1;
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      setQuantity(quantity + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProceedToPay = () => {
    navigation.navigate("CheckoutScreen");
  };

  const CartListContainer = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <MaterialIcons name="arrow-back" size={24} color="#39C61C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('CartScreen')}}>
            <MaterialIcons name="shopping-cart" size={24} color="#39C61C" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartCard
              item={item}
              onIncreaseQty={() => handleAddToCart(item.docId)}
              onDecreaseQty={() => handleRemoveFromCart(item.docId)}
            />
          )}
          contentContainerStyle={styles.cartListContainer}
        />
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedToPay}
        >
          <Text style={styles.proceedButtonText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CartListContainer />}
        ListFooterComponent={<View style={styles.bottomSpace} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 10,
  },
  bottomSpace: {
    height: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cartListContainer: {
    paddingBottom: 20,
  },
  proceedButton: {
    backgroundColor: "#39C61C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  proceedButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
