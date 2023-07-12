import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";

const HomeScreen = () => {
  const productsForYouData = [
    {
      id: 1,
      title: "Product 1",
      rating: 4.5,
      image: require("../assets/category1.png"),
    },
    {
      id: 2,
      title: "Product 2",
      rating: 3.8,
      image: require("../assets/category2.png"),
    },
    {
      id: 3,
      title: "Product 3",
      rating: 4.2,
      image: require("../assets/category3.png"),
    },
    {
      id: 4,
      title: "Product 4",
      rating: 4.7,
      image: require("../assets/category4.png"),
    },
    {
      id: 5,
      title: "Product 5",
      rating: 4.1,
      image: require("../assets/category5.png"),
    },
  ];

  const categoryData = [
    {
      id: 1,
      title: "Gifts",
      image: require("../assets/productCategory1.png"),
      link: "gift",
    },
    {
      id: 2,
      title: "Books",
      image: require("../assets/productCategory2.png"),
      link: "birthday",
    },
    {
      id: 3,
      title: "Lamps",
      image: require("../assets/productCategory3.png"),
      link: "cake",
    },
    {
      id: 4,
      title: "Sweets",
      image: require("../assets/productCategory4.png"),
      link: "sweets",
    },
    {
      id: 5,
      title: "Stationary",
      image: require("../assets/productCategory5.png"),
      link: "stationary",
    },
    {
      id: 6,
      title: "Sports",
      image: require("../assets/productCategory6.png"),
      link: "sports",
    },
  ];

  const latestDealsData = [
    {
      id: 1,
      image: require("../assets/deal1.png"),
      link: "https://example.com/deal1",
    },
    {
      id: 2,
      image: require("../assets/deal2.png"),
      link: "https://example.com/deal2",
    },
    {
      id: 3,
      image: require("../assets/deal3.png"),
      link: "https://example.com/deal3",
    },
  ];

  const trendingNowData = [
    {
      id: 1,
      image: require("../assets/trending1.png"),
      link: "https://example.com/trending1",
    },
    {
      id: 2,
      image: require("../assets/trending2.png"),
      link: "https://example.com/trending2",
    },
    {
      id: 3,
      image: require("../assets/trending3.png"),
      link: "https://example.com/trending3",
    },
  ];

  const HomeContainer = () => {
    const navigation = useNavigation();
    const handleCategoryPress = (categoryData) => {
      navigation.navigate("ProductListScreen", { categoryData });
    };
    const renderLatestDealItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => handleDealPress(item.link)}
        style={styles.latestDealsItem}
      >
        <Image
          source={item.image}
          style={styles.latestDealsImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );

    const renderTrendingNowItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleTrendingPress(item.link)}>
        <Image
          source={item.image}
          style={styles.trendingNowImage}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
    const renderProductsForYouItem = ({ item }) => (
      <TouchableOpacity style={styles.productsForYouCard}>
        <Image
          source={item.image}
          style={styles.productsForYouCardImage}
          resizeMode="cover"
        />
        <View style={styles.productsForYouCardOverlay}>
          <Text style={styles.productsForYouCardTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );

    const renderCategoryItem = ({ item }) => (
      <TouchableOpacity
        style={styles.categoryCard}
        onPress={() => handleCategoryPress(item.link)}
      >
        <ImageBackground
          source={item.image}
          style={styles.categoryCardImage}
          resizeMode="cover"
        >
          <View style={styles.categoryCardOverlay}>
            <Text style={styles.categoryCardTitle}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
    return (
      <>
        <CustomHeader  signout={true}/>
        <View style={styles.mainContainer}>
        <Text style={styles.greetingText}>
          Hey <Text style={styles.boldText}>User!</Text>
        </Text>
        <Text style={styles.sectionTitle}>Latest Deals</Text>
        <FlatList
          data={latestDealsData}
          renderItem={renderLatestDealItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Set the number of columns to 2
          contentContainerStyle={styles.latestDealsContainer} // Add container style
        />

        <Text style={styles.sectionTitle}>Trending Now</Text>
        <FlatList
          data={trendingNowData}
          renderItem={renderTrendingNowItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.trendingNowContainer}
        />
        <Text style={styles.sectionTitle}>Products for You</Text>
        <FlatList
          data={productsForYouData.filter((item) => item.rating > 4)}
          renderItem={renderProductsForYouItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.productsForYouContainer}
        />
        <Text style={styles.sectionTitle}>Shop By Category</Text>
        <FlatList
          data={categoryData}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          style={styles.categoryContainer}
        />
        </View>
      </>
    );
  };

  return (
    <ImageBackground
      source={require("../assets/gradient.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<HomeContainer />}
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
  mainContainer:{
    margin: 20,
  },
  bottomSpace: {
    height: 60,
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  latestDealsContainer: {
    marginBottom: 20,
  },
  latestDealsImage: {
    width: 150,
    height: 120,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  trendingNowContainer: {
    marginBottom: 20,
  },
  trendingNowImage: {
    width: "100%",
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  productsForYouContainer: {
    marginBottom: 20,
  },
  productsForYouCard: {
    width: 108,
    height: 108,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  productsForYouCardImage: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  productsForYouCardOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  productsForYouCardTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    aspectRatio: 1,
  },
  categoryCardImage: {
    flex: 1,
    alignItems: "center",
  },
  categoryCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
  },
  categoryCardTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  latestDealsContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  latestDealsItem: {
    flex: 1,
    aspectRatio: 1, // Maintain a square aspect ratio
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  latestDealsImage: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
});

export default HomeScreen;
