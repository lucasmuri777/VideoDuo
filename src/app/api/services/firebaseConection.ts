// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAew1F6oVRSWJhw_vbPlSWbfepnYKhCk7M",
  authDomain: "duo-videos.firebaseapp.com",
  projectId: "duo-videos",
  storageBucket: "duo-videos.appspot.com",
  messagingSenderId: "449283710988",
  appId: "1:449283710988:web:88eed51057ad5c8d4c4e29",
  measurementId: "G-JYMM3ESKHS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);