import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const ExploreScreen = () => {
  const exploreData = [
    {
      id: 1,
      title: 'STREET FOODS',
      image: require('../assets/category1.png'),
      link: 'https://example.com/category1',
    },
    {
      id: 2,
      title: 'RESTAURANTS',
      image: require('../assets/category2.png'),
      link: 'https://example.com/category2',
    },
    {
      id: 3,
      title: 'BAKERIES',
      image: require('../assets/category3.png'),
      link: 'https://example.com/category3',
    },
    {
      id: 4,
      title: 'SWEETS',
      image: require('../assets/category4.png'),
      link: 'https://example.com/category4',
    },
    {
      id: 5,
      title: 'ICECREAM PARLOURS',
      image: require('../assets/category5.png'),
      link: 'https://example.com/category5',
    },
    {
      id: 6,
      title: 'BARS',
      image: require('../assets/category6.png'),
      link: 'https://example.com/category6',
    },
    {
      id: 7,
      title: 'COFFEE',
      image: require('../assets/category7.png'),
      link: 'https://example.com/category7',
    },
    {
      id: 8,
      title: 'CHINESE',
      image: require('../assets/category8.png'),
      link: 'https://example.com/category8',
    },
  ];

  const navigation = useNavigation();

  const handleCardPress = (link) => {
    Linking.openURL(link);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardPress(item.link)}>
      <View style={styles.card}>
        <ImageBackground source={item.image} style={styles.cardImage} resizeMode="cover">
          <View style={styles.cardOverlay}>
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} >
      <ImageBackground source={require('../assets/explore.png')} style={styles.headerImage}>
        <View style={styles.headerOverlay}>
          <View style={styles.logoContainer}>
            <Text style={styles.headerText}>Scale</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText1}>FLAVORS</Text>
            <Text style={styles.headerText2}>NEXT DOORS</Text>
          </View>
        </View>
      </ImageBackground>

      <FlatList
        data={exploreData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
    height: 164,
  },
  logoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  logoImage: {
    width: 100,
    height: 50,
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 10,
  },
  headerText: {
    color: '#39C61C',
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 5,
  },
  headerText1: {
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 5,
  },
  headerText2: {
    color: '#39C61C',
    fontSize: 10,
    fontWeight: '800',
  },
  card: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').width / 2 - 50,
  },
  headerOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  cardOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  cardTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExploreScreen;
