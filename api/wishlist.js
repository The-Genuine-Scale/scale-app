import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const getWishlistItems = async (uid) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      return userData.wishlist;
    } else {
      console.log('User does not exist');
      return [];
    }
  } catch (error) {
    console.error('Error retrieving wishlist items:', error);
    throw error;
  }
};

export const handleWishlist = async (uid, productId) => {
  try {
    const usersCollection = collection(db, 'Users');
    const userQuery = query(usersCollection, where('userId', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userRef = doc(db, 'Users', userDoc.id);
      const userData = userDoc.data();
      let updatedWishlist = [...userData.wishlist];
      let itemExists = false;

      updatedWishlist = updatedWishlist.map(item => {
        if (item.productId === productId) {
          itemExists = true;
          return null;
        } else {
          return item;
        }
      }).filter(Boolean);;

      if (!itemExists) {
        updatedWishlist.push({ productId });
      }

      await updateDoc(userRef, { wishlist: updatedWishlist });
    } else {
      console.log('User does not exist');
    }
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    throw error;
  }
};