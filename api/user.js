import {
    query,
    collection,
    where,
    getDocs,
    updateDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  export const getUserDetails = async (uid) => {
    try {
      const usersCollection = collection(db, "Users");
      const userQuery = query(usersCollection, where("userId", "==", uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        return userData;
      } else {
        console.log("User does not exist");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user details:", error);
      throw error;
    }
  };
  
  export const updateUserDetails = async (uid, updatedDetails) => {
    try {
      const usersCollection = collection(db, "Users");
      const userQuery = query(usersCollection, where("userId", "==", uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        await updateDoc(userRef, updatedDetails);
        console.log("User details updated successfully");
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      throw error;
    }
  };
  
  export const addAddressToUser = async (uid, address) => {
    try {
      const usersCollection = collection(db, "Users");
      const userQuery = query(usersCollection, where("userId", "==", uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userRef = doc(db, "Users", userDoc.id);
        const userData = userDoc.data();
        let updatedAddresses = [...userData.address];
        updatedAddresses.push(address);
        await updateDoc(userRef, { address: updatedAddresses });
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.error("Error adding the address", error);
      throw error;
    }
  };
  
  export const getAddressesByUser = async (uid) => {
    try {
      const usersCollection = collection(db, "Users");
      const userQuery = query(usersCollection, where("userId", "==", uid));
      const userSnapshot = await getDocs(userQuery);
  
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        return userData.address;
      } else {
        console.log("User does not exist");
        return [];
      }
    } catch (error) {
      console.error("Error retrieving the addresses:", error);
      throw error;
    }
  };
  