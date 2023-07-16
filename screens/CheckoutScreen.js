import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView
} from "react-native";
import CartCard from "../components/CartCard";
import { getCartItems } from "../api/cart";
import { getProductById } from "../api/product";
import { updateOrderHistory } from "../api/order";
import { addAddressToUser, getAddressesByUser } from "../api/user";
import { getUserDetails } from "../api/user";
import { retrieveData } from "../localstorage/localstorage";

const CheckoutScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [personalDetails, setPersonalDetails] = useState({});
  const [addressOptions, setAddressOptions] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const userId = await retrieveData("uid");
      if (!userId) {
        navigateToLoginScreen();
      } else {
        setUserId(userId);
        fetchUserDetails(userId);
        fetchCartItems(userId);
        fetchAddresses(userId);
        console.log("getUserId", userId);
      }
    };
    getUserId();
  }, [userId]);

  const fetchUserDetails = async (userId) => {
    try {
      console.log(userId);
      const userDetails = await getUserDetails(userId);
      setPersonalDetails({
        name: userDetails.name,
        mobileNumber: userDetails.mobileNumber,
        email: userDetails.email,
      });
      console.log(personalDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCartItems = async (userId) => {
    try {
      const items = await getCartItems(userId);
      const cartItemsWithDetails = await Promise.all(
        items.map(async (item) => {
          const product = await getProductById(item.productId);
          return { ...product, quantity: item.quantity };
        })
      );
      setCartItems(cartItemsWithDetails);
      console.log(cartItemsWithDetails);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAddresses = async (userId) => {
    try {
      const addresses = await getAddressesByUser(userId);
      setAddressOptions(addresses);
      console.log(addressOptions);
    } catch (error) {
      console.log(error);
    }
  };
  const handleQuantityIncrease = (docId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.docId === docId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  
  const handleQuantityDecrease = (docId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.docId === docId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };
  const handleCheckout = async () => {
    try {
      const userId = await retrieveData("uid");
      for (const item of cartItems) {
        const orderDetails = {
          personalDetails,
          selectedAddress,
          paymentMethod,
          product: item,
          quantity: item.quantity,
        };

        await updateOrderHistory(userId, orderDetails);
      }

      setCartItems([]);
      setPersonalDetails({});
      setAddressOptions([]);
      setSelectedAddress("");
      setPaymentMethod("");
      console.log("Order placed successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddAddress = async () => {
    const userId = await retrieveData("uid");
    console.log(userId, 2)
    if (newAddress) {
      try {
        await addAddressToUser(userId, newAddress);
        setAddressOptions([...addressOptions, newAddress]);
        setSelectedAddress(newAddress);
        setNewAddress("");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const CheckoutContainer = () =>{
    return (

    <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.checkoutContainer}>
        <View style={styles.checkoutSection}>
          <Text style={styles.checkoutSectionLabel}>1</Text>
          <View style={styles.checkoutForm}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={personalDetails.name || ""}
              onChangeText={(text) =>
                setPersonalDetails({ ...personalDetails, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={personalDetails.email || ""}
              onChangeText={(text) =>
                setPersonalDetails({ ...personalDetails, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={personalDetails.mobileNumber || ""}
              onChangeText={(text) =>
                setPersonalDetails({ ...personalDetails, mobileNumber: text })
              }
            />
            {/* Address List */}
            <View style={styles.addressList}>
              <Text style={styles.sectionTitle}>Select Address</Text>
              {addressOptions.map((address) => (
                <TouchableOpacity
                  key={address}
                  style={styles.addressOption}
                  onPress={() => setSelectedAddress(address)}
                >
                  {/* Radio button */}
                  <View
                    style={[
                      styles.radioButton,
                      selectedAddress === address &&
                        styles.radioButtonSelected,
                    ]}
                  />
                  <Text style={styles.addressText}>{address}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* Add New Address */}
            <TextInput
              style={styles.input}
              placeholder="Add New Address"
              value={newAddress}
              onChangeText={(text) => setNewAddress(text)}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddAddress}
            >
              <Text style={styles.buttonText}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.checkoutSection}>
          <Text style={styles.checkoutSectionLabel}>2</Text>
          <View style={styles.checkoutItems}>
            <Text style={styles.sectionTitle}>Items</Text>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CartCard
                  item={item}
                  onIncreaseQty={() => handleQuantityIncrease(item.docId)}
                  onDecreaseQty={() => handleQuantityDecrease(item.docId)}
                />
              )}
              contentContainerStyle={styles.cartListContainer}
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={[styles.checkoutSection, styles.paymentSection]}>
          <Text style={styles.checkoutSectionLabel}>3</Text>
          <View style={styles.checkoutForm}>
            <Text style={styles.sectionTitle}>Payment Method</Text>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === "cash_on_deliver" &&
                  styles.paymentOptionSelected,
              ]}
              onPress={() => setPaymentMethod("cash_on_deliver")}
            >
              {/* Radio button */}
              <View
                style={[
                  styles.radioButton,
                  paymentMethod === "cash_on_deliver" &&
                    styles.radioButtonSelected,
                ]}
              />
              <Text>Cash on Delivery</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.payButton} onPress={handleCheckout}>
            <Text style={styles.buttonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>

    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<CheckoutContainer />}
        ListFooterComponent={<View style={styles.bottomSpace} />}
      />
    </SafeAreaView>
  );
};

const styles = {
  checkoutContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  bottomSpace: {
    height: 80,
  },
  checkoutSection: {
    marginBottom: 24,
  },
  checkoutSectionLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 16,
  },
  checkoutForm: {
    flex: 1,
  },
  cartListContainer: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  addressList: {
    marginBottom: 16,
  },
  addressOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: "black",
  },
  addressText: {
    flex: 1,
  },
  addButton: {
    backgroundColor: "#39C61C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  checkoutItems: {
    marginBottom: 16,
  },
  paymentSection: {
    alignItems: "flex-start",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  payButton: {
    backgroundColor: "#39C61C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
};

export default CheckoutScreen;
