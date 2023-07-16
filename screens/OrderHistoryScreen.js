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
import { getProductById } from "../api/product";
import { useNavigation } from "@react-navigation/native";
import { getOrders } from "../api/order";

const OrderHistoryScreen = () => {
  const [orderItems, setOrderItems] = useState([]);
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
        fetchOrderItems(userId);
        console.log("getUserId", userId);
      }
    };
    getUserId();
  }, [userId]);
  const fetchOrderItems = async (userId) => {
    try {
      if (!userId) {
        navigateToLoginScreen();
      } else {
        console.log("fetchOrderItems", userId);
        const orderHistoryData = await getOrders(userId);
        orderHistoryData.product = [...orderHistoryData.product, {quantity: item.quantity}]
        setOrderItems(orderHistoryData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const OrderHistoryListContainer = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.goBack();}}>
            <MaterialIcons name="arrow-back" size={24} color="#39C61C" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate('CartScreen')}}>
            <MaterialIcons name="inventory" size={24} color="#39C61C" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={orderItems}
          keyExtractor={(item) => item.product.id}
          renderItem={({ item }) => (
            <CartCard
              item={item.product}
            />
          )}
          contentContainerStyle={styles.cartListContainer}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<OrderHistoryListContainer />}
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

export default OrderHistoryScreen;
