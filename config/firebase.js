import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBl1ELgwboG2cxYGdNN_iAvUVlISbOsR6k",
  authDomain: "visualize-app-522dd.firebaseapp.com",
  projectId: "visualize-app-522dd",
  storageBucket: "visualize-app-522dd.appspot.com",
  messagingSenderId: "231047231945",
  appId: "1:231047231945:web:8b34cb12a3a8f9b0ffd018",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
