import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export const updateOrderHistory = async (uid, item) => {
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
      let updatedOrderHistory = [...userData.orderHistory];
      updatedOrderHistory.push(item);

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