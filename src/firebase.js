import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2NFDhSytx4ukHRitu8NgcGV_9-jsfUSI",
  authDomain: "houseparty-dev-b6da9.firebaseapp.com",
  projectId: "houseparty-dev-b6da9",
  storageBucket: "houseparty-dev-b6da9.appspot.com",
  messagingSenderId: "138048021831",
  appId: "1:138048021831:web:fd3751adc0bfc475291862",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);