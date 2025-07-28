// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0SKkvPn9GZjuu4fvayD6ThwN0MlmDArg",
  authDomain: "moodtrackerfinal.firebaseapp.com",
  projectId: "moodtrackerfinal",
  storageBucket: "moodtrackerfinal.firebasestorage.app",
  messagingSenderId: "928967947635",
  appId: "1:928967947635:web:890bda1bf805e86d4e4106",
  measurementId: "G-JZ20PWKML3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);