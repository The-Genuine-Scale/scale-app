import { db } from "./firebase";

export async function addToWishlist(userId, item) {
  console.log("6");
  const userRef = db.collection("Users").doc(userId);
  await userRef.update({
    wishlist: [...item, ...userRef.wishlist],
  });
}
export async function removeFromWishlist(userId, itemId) {
  console.log("7");
  const userRef = db.collection("Users").doc(userId);
  await userRef.update({
    wishlist: userRef.wishlist.filter((item) => item.productId !== itemId),
  });
}
