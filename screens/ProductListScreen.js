import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const ProductListScreen = ({ route }) => {
  const { categoryData } = route.params;

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item.docId)}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      <View style={styles.productOverlay}>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.sellerName}>{item.seller}</Text>
      </View>
      <TouchableOpacity style={styles.wishlistButton}>
        <Text style={styles.wishlistIcon}>♡</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleProductPress = (docId) => {
    // Navigate to the Product Details Page using the docId
    // Implement your navigation logic here
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.docId.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productCard: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 0.8, // Adjust the aspect ratio based on your desired image height and width
  },
  productImage: {
    flex: 1,
  },
  productOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  productPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  productName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sellerName: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
  wishlistButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'transparent',
  },
  wishlistIcon: {
    fontSize: 24,
    color: 'white',
  },
});

export default ProductListScreen;
