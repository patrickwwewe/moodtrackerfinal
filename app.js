// app.js
//import necessary functions of Firebase --> App (Grundverbindung) Auth (Authentifizierung) und Firestore (Datenbank)
// This code assumes you have already set up Firebase and Firestore in your project
// Ensure you have the Firebase SDK and Firestore set up in your project

import { auth, provider, db } from './firebase-config.js';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


//here are the loging datas of the firebase Project (acces to HTML elements)
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const trackerDiv = document.getElementById("tracker");
const usernameDisplay = document.getElementById("username");
const saveBtn = document.getElementById("save-btn");

let currentUser = null; //user is set later when the user logs in

// Event listeners for login and logout buttons
//loggin
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider).catch((error) => {
    alert("Login-Fehler: " + error.message);
  });
});

//loggout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});

//is set automatically whenever the status of the loging changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user; //if logged in
    usernameDisplay.textContent = `Angemeldet als: ${user.displayName}`; //show username
    //show tracker.formular
    trackerDiv.style.display = "block";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    //load the mood data for today
    loadMood();
  } else { //if logged out
    currentUser = null;
    //just show the logging
    trackerDiv.style.display = "none";
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  }
});
//save the mood data of the day when the save button is clicked
saveBtn.addEventListener("click", async () => {
  if (!currentUser) return;
//read the emjois which are puted in
  const morningEmoji = document.getElementById("emoji-morning").value;
  const eveningEmoji = document.getElementById("emoji-evening").value;
//Datumsformatierung für Firestore
  const today = new Date().toISOString().split('T')[0]; // z. B. 2025-07-28
//reference to the Firestore document
  const ref = doc(db, "users", currentUser.uid, "moods", today);

  await setDoc(ref, {
    morning: morningEmoji,
    evening: eveningEmoji
  });

  alert("Gespeichert!");
});
//load data of the current user for today (if exists)
async function loadMood() {
  const today = new Date().toISOString().split('T')[0];
  const ref = doc(db, "users", currentUser.uid, "moods", today);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    //put the emojis in the input fields
    document.getElementById("emoji-morning").value = data.morning || "";
    document.getElementById("emoji-evening").value = data.evening || "";
  }
}