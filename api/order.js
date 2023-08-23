import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { removeCoBuyer, updateCoBuyers } from "./product";
import { fetchUserLocation } from "../location/location";

export const updatePrice = async (uid, orderId, price) => {
  try {
    const usersCollection = collection(db, "Users");
    const userQuery = query(usersCollection, where("userId", "==", uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, "Users", userDoc.id);
      const userData = userDoc.data();
      let updatedOrderHistory = [...userData.orderHistory];

      const orderIndex = updatedOrderHistory.findIndex(
        (order) => order.uid === orderId
      );

      if (orderIndex !== -1) {
        updatedOrderHistory[orderIndex].price = price;
        await updateDoc(userRef, {
          orderHistory: updatedOrderHistory,
        });
        console.log("Order price updated successfully");
      } else {
        console.log("Order does not exist");
      }
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error updating order price:", error);
    throw error;
  }
};

export const updateStatus = async (uid, orderId, status) => {
  try {
    const usersCollection = collection(db, "Users");
    const userQuery = query(usersCollection, where("userId", "==", uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, "Users", userDoc.id);
      const userData = userDoc.data();
      let updatedOrderHistory = [...userData.orderHistory];

      const orderIndex = updatedOrderHistory.findIndex(
        (order) => order.uid === orderId
      );

      if (orderIndex !== -1) {
        updatedOrderHistory[orderIndex].status = status;
        if (status === "Dispatched") {
          removeCoBuyer(updatedOrderHistory[orderIndex].product.docId, orderId);
        }
        await updateDoc(userRef, {
          orderHistory: updatedOrderHistory,
        });
        console.log("Order status updated successfully");
      } else {
        console.log("Order does not exist");
      }
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error updating order price:", error);
    throw error;
  }
};

const generateUID = () => {
  const randomString = Math.random().toString(36).substring(2);
  const timestamp = new Date().getTime().toString(36);
  return randomString + timestamp;
};

export const addOrderHistory = async (uid, item) => {
  try {
    const usersCollection = collection(db, "Users");
    const userQuery = query(usersCollection, where("userId", "==", uid));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, "Users", userDoc.id);
      const userData = userDoc.data();
      let updatedCart = [...userData.cart];
      updatedCart = updatedCart
        .map((cartItem) => {
          if (cartItem.productId === item.product.docId) {
            if (cartItem.quantity > item.quantity) {
              return {
                productId: cartItem.productId,
                quantity: cartItem.quantity - item.quantity,
              };
            } else {
              return null;
            }
          } else {
            return cartItem;
          }
        })
        .filter(Boolean);
      const orderId = generateUID();
      const newItem = { ...item, uid: orderId };
      console.log("newItem: ", newItem);
      const updatedOrderHistory = [...userData.orderHistory, newItem];
      const location = fetchUserLocation()
      const newCoBuyer = {
        name: userData.name,
        userId: uid,
        location: location,
        price: item.price,
        orderId: orderId,
      };
      console.log("newCoBuyer: ", newCoBuyer);
      console.log("updatedCart: ", updatedCart);
      await updateCoBuyers(item.product.docId, newCoBuyer);
      await updateDoc(userRef, {
        orderHistory: updatedOrderHistory,
        cart: updatedCart,
      });
    } else {
      console.log("User does not exist");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const getOrders = async (uid) => {
  try {
    const usersCollection = collection(db, "Users");
    const userQuery = query(usersCollection, where("userId", "==", uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      return userData.orderHistory;
    } else {
      console.log("User does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving order history:", error);
    throw error;
  }
};
