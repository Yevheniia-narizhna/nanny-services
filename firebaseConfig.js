import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAhtLksaJvhmQH2hCViky6aQeD5UKyfPew",
  authDomain: "nannies-32710.firebaseapp.com",
  databaseURL:
    "https://nannies-32710-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nannies-32710",
  storageBucket: "nannies-32710.firebasestorage.app",
  messagingSenderId: "109518422849",
  appId: "1:109518422849:web:8df2235dca31916fe697c0",
  measurementId: "G-38E81FPT1E",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

export { database };
