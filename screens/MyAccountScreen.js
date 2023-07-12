import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUserDetails } from "../api/user";
import { retrieveData } from "../localstorage/localstorage";
import CustomHeader from "../components/CustomHeader";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/FontAwesome5";
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";

const { width } = Dimensions.get("window");

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  const [circleRadius, setCircleRadius] = useState(0);

  var userId;
  const getUserId = async () => {
    userId = await retrieveData("uid");
    if (userId === null) {
      navigation.navigate("LoginScreen");
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getUserId();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      const fetchUserDetails = async () => {
        await getUserId();
        try {
          const userDetails = await getUserDetails(userId);
          setUserDetails(userDetails);
          if (userDetails == null) {
            navigation.navigate("LoginScreen");
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchUserDetails();
    }, [userId])
  );
  const handleEditProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleViewOrder = () => {
    navigation.navigate("OrderHistoryScreen");
  };

  const handleContactUs = () => {
    navigation.navigate("ContactUsScreen");
  };

  const handleAboutUs = () => {
    navigation.navigate("AboutUsScreen");
  };

  const handleCart = () => {
    navigation.navigate("CartScreen");
  };

  const calculateCircleRadius = () => {
    const radius = width / 2;
    setCircleRadius(radius);
  };

  const MyAccountContainer = () => {
    return (
      <>
      <CustomHeader  signout={false}/>
        <View style={styles.container}>
          {userDetails && (
            <>
              <View style={[styles.circle, { top: -circleRadius }]} />
              <Image
                source={{ uri: userDetails.photoURL }}
                style={styles.image}
                onLoad={calculateCircleRadius}
              />
              <Text style={styles.name}>{userDetails.name}</Text>
              <Text style={styles.address}>{userDetails?.address}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
                  <LinearGradient
                    colors={["rgba(57, 198, 28, 0.375)", "rgba(57, 198, 28, 0.25)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <Icon name="user-edit" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleViewOrder} style={styles.button}>
                  <LinearGradient
                    colors={["rgba(57, 198, 28, 0.375)", "rgba(57, 198, 28, 0.25)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <Icon name="clipboard-list" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>View Order</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContactUs} style={styles.button}>
                  <LinearGradient
                    colors={["rgba(57, 198, 28, 0.375)", "rgba(57, 198, 28, 0.25)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <Icon name="phone" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Contact Us</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAboutUs} style={styles.button}>
                  <LinearGradient
                    colors={["rgba(57, 198, 28, 0.375)", "rgba(57, 198, 28, 0.25)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <Icon name="info-circle" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>About Us</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCart} style={styles.button}>
                  <LinearGradient
                    colors={["rgba(57, 198, 28, 0.375)", "rgba(57, 198, 28, 0.25)"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradient}
                  >
                    <Icon name="shopping-cart" size={20} color="white" style={styles.buttonIcon} />
                    <Text style={styles.buttonText}>Cart</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<MyAccountContainer />}
        ListFooterComponent={<View style={styles.bottomSpace} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  bottomSpace:{
    height:80
  },
  circle: {
    position: "absolute",
    top: 0,
    backgroundColor: "#39C61C40",
    width: 1.3 * width,
    height: 1.3 * width,
    borderRadius: width,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginTop: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: 800,
  },
  address: {
    fontSize: 10,
    fontWeight: 400,
    width: "60%",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 100,
  },
  button: {
    borderRadius: 100,
    padding: 10,
  },
  gradient: {
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: 300,
  },
  buttonIcon: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#39C61C80',
    padding: 8,
    borderRadius: 50,
    height: 40,
    width: 40,
    textAlign: 'center'
  },
  buttonText: {
    color: "black",
    fontWeight: 700,
    textAlign: "center",
  },
});

export default MyAccountScreen;
