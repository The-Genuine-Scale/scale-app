import { collection, getDocs, where, query, addDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
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
    console.log(productDetails)
    const productsCollection = collection(db, "Products");
    const productQuery = query(productsCollection, where("docId", "==", productDetails.docId));
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
      console.log(productSnapshot.docs)
      const productDoc = productSnapshot.docs[0];
      const productRef = doc(db, "Products", productDoc.id);
      const reviews = productDetails.reviews;
      console.log(reviews)
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      console.log( totalRating, averageRating)
      const updatedProductDetails = {
        ...productDetails,
        rating: averageRating,
      };
      await updateDoc(productRef, updatedProductDetails);
      console.log("Product details updated successfully");
    } else {
      console.log("Product does not exist");
    }
  } catch (error) {
    console.error("Error updating Product details:", error);
    throw error;
  }
};

export async function getProductById(docId) {
  console.log("10");
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
  console.log("11");
  const prodCol = collection(db, "Products");
  const prodSnapshot = await getDocs(prodCol);
  const prodList = prodSnapshot.docs.map((doc) => doc.data());
  return prodList;
}

export async function getProductsByCategory(category) {
  console.log("13");
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
