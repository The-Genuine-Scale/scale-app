import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CartCard = ({ item, onIncreaseQty, onDecreaseQty }) => {
  console.log(item)
  const handleIncreaseQty = () => {
    onIncreaseQty(item);
  };

  const handleDecreaseQty = () => {
    onDecreaseQty(item);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.seller}>{item.seller}</Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>&#8377;</Text>
          <Text style={[styles.price, { color: "#39C61C" }]}>{item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          {onIncreaseQty && (
            <TouchableOpacity onPress={handleDecreaseQty}>
              <MaterialIcons name="remove-circle" size={24} color="#39C61C" />
            </TouchableOpacity>
          )}
          <Text style={styles.quantity}>{item.quantity}</Text>
          {onDecreaseQty && (
            <TouchableOpacity onPress={handleIncreaseQty}>
              <MaterialIcons name="add-circle" size={24} color="#39C61C" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    backgroundColor: "#EDEDED",
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  seller: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  rightContainer: {
    flex: 1,
    margin: 0,
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
});

export default CartCard;
