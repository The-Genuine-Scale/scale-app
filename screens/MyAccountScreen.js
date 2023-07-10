import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserDetails } from '../api/user';
import { retrieveData } from '../localstorage/localstorage';

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});

  var userId;
  const getUserId = async () => {
    userId = await retrieveData('uid');
    console.log('uid', userId);
  };
  getUserId();
  useEffect(() => {
    const fetchUserDetails = async () => {
      await getUserId();
      console.log(userId)
      try {
        const userDetails = await getUserDetails(userId);
        setUserDetails(userDetails);
        if(userDetails==null){
          navigation.navigate('LoginScreen')
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserDetails();
  }, [userId]);



  const handleEditProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  const handleViewOrder = () => {
    navigation.navigate('OrderHistoryScreen');
  };

  const handleContactUs = () => {
    navigation.navigate('ContactUsScreen');
  };

  const handleAboutUs = () => {
    navigation.navigate('AboutUsScreen');
  };

  const handleCart = () => {
    navigation.navigate('CartScreen');
  };

  return (
    <View>
      {userDetails && (
        <>
          <Image source={{ uri: userDetails.photoURL }} style={{ width: '100%', height: 200 }} />
          <View style={{ flexDirection: 'column', justifyContent: 'center', margin: 20 }}>
            <TouchableOpacity onPress={handleEditProfile} style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleViewOrder} style={styles.button}>
              <Text style={styles.buttonText}>View Order</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleContactUs} style={styles.button}>
              <Text style={styles.buttonText}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAboutUs} style={styles.button}>
              <Text style={styles.buttonText}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCart} style={styles.button}>
              <Text style={styles.buttonText}>Cart</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = {
  button: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
    margin: 10
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
};

export default MyAccountScreen;
