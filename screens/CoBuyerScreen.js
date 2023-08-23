import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { getProductById, updateProductDetails } from "../api/product";
import { retrieveData } from "../localstorage/localstorage";
import { getUserDetails } from "../api/user";
import { fetchUserLocation } from "../location/location";

const CoBuyerScreen = ({ route }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [coBuyer, setCoBuyer] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCoBuyer, setSelectedCoBuyer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { docId } = route.params;

  useEffect(() => {
    fetchProductDetails(docId);
    const location = fetchUserLocation();
    setUserLocation(location);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleAddToCoBuyerList}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>
          Add myself to the co-buyer list
        </Text>
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
