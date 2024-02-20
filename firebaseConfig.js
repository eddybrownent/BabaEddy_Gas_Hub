// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getReactNativePersistence, initializeAuth} from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {getFirestore, collection} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3udM9mC1BfXZj4os6a4C7zaCyeo659Ao",
  authDomain: "gas-delivery-1d498.firebaseapp.com",
  projectId: "gas-delivery-1d498",
  storageBucket: "gas-delivery-1d498.appspot.com",
  messagingSenderId: "121995814710",
  appId: "1:121995814710:web:337ff29f15a37f6dd67597"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');

export const productsRef = collection(db, 'products');
