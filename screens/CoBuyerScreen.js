import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getProductById, updateProductDetails } from "../api/product";
import * as Location from "expo-location";
import { retrieveData } from "../localstorage/localstorage";
import { getUserDetails } from "../api/user";

const CoBuyerScreen = ({ route }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [coBuyer, setCoBuyer] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCoBuyer, setSelectedCoBuyer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { docId } = route.params;

  useEffect(() => {
    fetchProductDetails(docId);
    fetchUserLocation();
  }, []);

  const fetchProductDetails = async (docId) => {
    try {
      const product = await getProductById(docId);
      setProductDetails(product);
      setCoBuyer(product.coBuyer);
    } catch (error) {
      console.log("Error fetching product details:", error);
    }
  };

  const fetchUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission not granted");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.log("Error fetching user location:", error);
    }
  };

  const handleAddToCoBuyerList = async () => {
    const userId = await retrieveData("uid");
    const userDetails = await getUserDetails(userId);
    const newCoBuyer = {
      name: userDetails.name,
      userId: userId,
      location: userLocation,
      price: calculateUpdatedPrice(),
    };
    const updatedCoBuyer = coBuyer ? [...coBuyer, newCoBuyer] : [newCoBuyer];
    const updatedProductDetails = {
      ...productDetails,
      coBuyer: updatedCoBuyer,
    };
    await updateProductDetails(updatedProductDetails);
    setCoBuyer(updatedCoBuyer);
  };

  const handleModalClose = () => {
    setSelectedCoBuyer(null);
    setShowModal(false);
  };

  const calculateUpdatedPrice = () => {
    const discount = coBuyer?.length * 100;
    return productDetails?.price - discount;
  };

  const calculateDistance = (location1, location2) => {
    const earthRadius = 6371;
    const lat1 = location1.latitude;
    const lon1 = location1.longitude;
    const lat2 = location2.latitude;
    const lon2 = location2.longitude;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const toRadians = (angle) => {
    return (angle * Math.PI) / 180;
  };

  const coBuyerWithinRadius = coBuyer?.filter((e) => {
    if (userLocation) {
      const distance = calculateDistance(userLocation, e.location);
      const radius = 5;
      return distance <= radius;
    }
    return false;
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleAddToCoBuyerList}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add myself to the co-buyer list</Text>
      </TouchableOpacity>

      {coBuyerWithinRadius?.map((coBuyer) => (
        <Text key={coBuyer.userId} style={styles.coBuyerText}>
          {coBuyer.name}
        </Text>
      ))}

      <Modal visible={showModal} onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Congratulations!</Text>
          <Text style={styles.modalText}>
            Updated Price: {calculateUpdatedPrice()}
          </Text>
          <TouchableOpacity
            onPress={handleModalClose}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ffffff",
  },
  addButton: {
    backgroundColor: "#61dafb",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  coBuyerText: {
    backgroundColor: "#c5e1a5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#61dafb",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CoBuyerScreen;
