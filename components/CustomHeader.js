import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { handleSignOut } from '../api/auth';

const CustomHeader = () => {
  const navigation = useNavigation();

  const handleSignOutPress = () => {
    handleSignOut(navigation);
  };

  return (
    <View style={styles.headerContainer}>
    <Image source={require('../assets/logo.png')} style={styles.headerLogo} resizeMode="contain" />
      <TouchableOpacity onPress={handleSignOutPress} style={styles.headerButton}>
        <Icon name="sign-out" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "transparent"
  },
  headerButton: {
    marginRight: 10,
  },
  headerLogo: {
    width: 150,
    height: 40,
  },
};

export default CustomHeader;
