import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg150ZlSz_o7rcpqBhNvIEGN88VK4-Uj8",
  authDomain: "fun-chat-2c978.firebaseapp.com",
  projectId: "fun-chat-2c978",
  storageBucket: "fun-chat-2c978.appspot.com",
  messagingSenderId: "908333403867",
  appId: "1:908333403867:web:4323a6277a51cd32cf06fe",
  measurementId: "G-RVMYBH074L",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
export default firebase;
