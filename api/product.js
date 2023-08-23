import { collection, getDocs, where, query, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function saveProduct(productData) {
  try {
    const prodCol = collection(db, "Products");
    await addDoc(prodCol, productData);
    console.log("Product saved successfully!");
  } catch (error) {
    console.log("Error saving product:", error);
  }
}
export const updateProductDetails = async (productDetails) => {
  try {
    const productsCollection = collection(db, "Products");
    const productQuery = query(productsCollection, where("docId", "==", productDetails.docId));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      const productDoc = productSnapshot.docs[0];
      const productRef = doc(db, "Products", productDoc.id);
      await updateDoc(productRef, productDetails);
      console.log("Product details updated successfully");
    } else {
      console.log("Product does not exist");
    }
  } catch (error) {
    console.error("Error updating Product details:", error);
    throw error;
  }
};
export const updateCoBuyers = async (productId, newCoBuyer) => {
  try {
    console.log(productId, newCoBuyer)
    const productsCollection = collection(db, "Products");
    const productQuery = query(productsCollection, where("docId", "==", productId));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      const productDoc = productSnapshot.docs[0];
      const productRef = doc(db, "Products", productDoc.id);
      const productData = productSnapshot.data();
      const productSnapshot = await getDoc(productRef);
      const coBuyers = productData.coBuyers || [];
      coBuyers.push(newCoBuyer);
      await updateDoc(productRef, {coBuyers});
      console.log("CoBuyers updated successfully");
    } else {
      console.log("No CoBuyers!!");
    }
  } catch (error) {
    console.error("Error updating the CoBuyers:", error);
    throw error;
  }
};

export const removeCoBuyer = async (productId, orderId) => {
  try {
    const productsCollection = collection(db, "Products");
    const productQuery = query(productsCollection, where("docId", "==", productId));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      const productDoc = productSnapshot.docs[0];
      const productRef = doc(db, "Products", productDoc.id);
      const productData = productDoc.data();
      const coBuyers = productData.coBuyers || [];
      const coBuyerIndex = coBuyers.findIndex(coBuyer => coBuyer.orderId === orderId);

      if (coBuyerIndex !== -1) {
        coBuyers.splice(coBuyerIndex, 1);
        await updateDoc(productRef, { coBuyers });
        console.log("Co-buyer removed successfully");
      } else {
        console.log("Co-buyer with the specified orderId does not exist");
      }
    } else {
      console.log("Product does not exist");
    }
  } catch (error) {
    console.error("Error updating the co-buyers:", error);
    throw error;
  }
};


export async function getProductById(docId) {
  const prodCol = collection(db, "Products");
  const q = query(prodCol, where("docId", "==", docId));
  const prodSnapshot = await getDocs(q);

  if (prodSnapshot.empty) {
    console.log("empty");
    return;
  }

  const prodDoc = prodSnapshot.docs[0];
  const prodObject = prodDoc.data();
  return prodObject;
}

export async function getProducts() {
  const prodCol = collection(db, "Products");
  const prodSnapshot = await getDocs(prodCol);
  const prodList = prodSnapshot.docs.map((doc) => doc.data());
  return prodList;
}

export async function getIsTrendingProducts() {
  const prodCol = collection(db, "Products");
  const prodSnapshot = await getDocs(prodCol);
  const prodList = prodSnapshot.docs
  .map((doc) => doc.data())
  .filter((product) => product.isTrending === true);
  return prodList;
  }

  export async function getLatestDeals() {
    const prodCol = collection(db, "Products");
    const prodSnapshot = await getDocs(prodCol);
    const prodList = prodSnapshot.docs
    .map((doc) => doc.data())
    .filter((product) => product.latestDeal === true);
    return prodList;
    }

export async function getProductsByCategory(category) {
  const prodCol = collection(db, "Products");
  let prodSnapshot;
  if (category) {
    const q = query(prodCol, where("category", "==", category));
    prodSnapshot = await getDocs(q);
  } else {
    prodSnapshot = await getDocs(prodCol);
  }
  const prodList = prodSnapshot.docs.map((doc) => doc.data());
  return prodList;
}
