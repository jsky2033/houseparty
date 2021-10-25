import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA2NFDhSytx4ukHRitu8NgcGV_9-jsfUSI",
  authDomain: "houseparty-dev-b6da9.firebaseapp.com",
  projectId: "houseparty-dev-b6da9",
  storageBucket: "houseparty-dev-b6da9.appspot.com",
  messagingSenderId: "138048021831",
  appId: "1:138048021831:web:fd3751adc0bfc475291862",
});

export const auth = app.auth();
export default app;
