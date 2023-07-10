import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(key, JSON.stringify(value), 'stored')
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  export const retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };