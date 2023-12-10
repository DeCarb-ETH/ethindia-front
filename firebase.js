// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6sjHayykE4oXYke6urgJu5Wx2NIZvCoo",
  authDomain: "dex3-cc194.firebaseapp.com",
  databaseURL: "https://dex3-cc194-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dex3-cc194",
  storageBucket: "dex3-cc194.appspot.com",
  messagingSenderId: "9196538420",
  appId: "1:9196538420:web:2db2b6da44a10230345861",
  measurementId: "G-CYXS6H5SV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 let database = getDatabase(app);

 export default database