//firebase initialization function
import firebase from "firebase/compat/app";
//firebase database/firestore function
import "firebase/compat/firestore";
//firebase auth function
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2NFDhSytx4ukHRitu8NgcGV_9-jsfUSI",
  authDomain: "houseparty-dev-b6da9.firebaseapp.com",
  projectId: "houseparty-dev-b6da9",
  storageBucket: "houseparty-dev-b6da9.appspot.com",
  messagingSenderId: "138048021831",
  appId: "1:138048021831:web:fd3751adc0bfc475291862",
};

const app = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export const auth = getAuth(app);
