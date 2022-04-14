// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAkS1u1ga8ABYSuC8Rmot-ff36CZlynI4",
  authDomain: "anivice-dea7e.firebaseapp.com",
  projectId: "anivice-dea7e",
  storageBucket: "anivice-dea7e.appspot.com",
  messagingSenderId: "907868160374",
  appId: "1:907868160374:web:ffff3edf4d29e8e48bba57",
  measurementId: "G-ZNHWFF9E1V",
  databaseURL: "https://anivice-dea7e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authenication = getAuth(app);
const database = getDatabase(app);