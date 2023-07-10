import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const getCartItems = async (uid) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      return userData.cart;
    } else {
      console.log('User does not exist');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    throw error;
  }
};

export const addToCart = async (uid, productId) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, 'Users', userDoc.id);
      const userData = userDoc.data();
      let updatedCart = [...userData.cart];
      let itemExists = false;

      updatedCart = updatedCart.map(item => {
        if (item.productId === productId) {
          itemExists = true;
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });

      if (!itemExists) {
        updatedCart.push({ productId, quantity: 1 });
      }

      await updateDoc(userRef, { cart: updatedCart });
    } else {
      console.log('User does not exist');
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};


export const removeFromCart = async (uid, productId) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, 'Users', userDoc.id);
      const userData = userDoc.data();
      const updatedCart = userData.cart.map(item => {
        if (item.productId === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        } else {
          return item;
        }
      }).filter(Boolean);

      await updateDoc(userRef, { cart: updatedCart });
    } else {
      console.log('User does not exist');
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
    throw error;
  }
};

export const getItemCount = async (uid, productId) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const cartItems = userData.cart;

      const item = cartItems.find(item => item.productId === productId);

      if (item) {
        console.log("qty", item.quantity)
        return item.quantity;
      } else {
        return 0;
      }
    } else {
      console.log('User does not exist');
      return 0;
    }
  } catch (error) {
    console.error('Error retrieving item count:', error);
    throw error;
  }
};
