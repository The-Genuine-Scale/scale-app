import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoFhIzcePvnVsGPcLbcrXTOfoDLHVtDYI",
  authDomain: "hehe-ba5e1.firebaseapp.com",
  projectId: "hehe-ba5e1",
  storageBucket: "hehe-ba5e1.appspot.com",
  messagingSenderId: "849570640499",
  appId: "1:849570640499:web:6c8deb53a5b90baa7eb006",
  measurementId: "G-HXM7SCLF0T",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
