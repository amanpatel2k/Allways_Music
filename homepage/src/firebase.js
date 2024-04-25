// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPwUxFZPNmBzcJKiRwAqBVy3279CDspkg",
  authDomain: "auth-development-6280a.firebaseapp.com",
  projectId: "auth-development-6280a",
  storageBucket: "auth-development-6280a.appspot.com",
  messagingSenderId: "328799375306",
  appId: "1:328799375306:web:bd23b60a3ca043cbf88933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
export default app;