import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRpqHUw7ELEOZWFjR00H64MIrNjNdSmZU",
  authDomain: "athentication-19d46.firebaseapp.com",
  databaseURL: "https://athentication-19d46-default-rtdb.firebaseio.com",
  projectId: "athentication-19d46",
  storageBucket: "athentication-19d46.appspot.com",
  messagingSenderId: "1044957916520",
  appId: "1:1044957916520:web:e12af0aaa797a5edb5badd",
  measurementId: "G-T3TWF2FM60"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export { app };