import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

//database api
import User from "../requests/UserAPI";
import House from "../requests/HouseAPI";

//firebase functions
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateEmail,
  sendPasswordResetEmail
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function updateUserEmail(email) {
    return updateEmail(auth.currentUser, email);
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    //function to get user data from DB
    const getUserData = async (user) => {
      const authId = user.uid;
      let userDB = await User.get(`/${authId}`);
      let userHouse = await House.get(`/${authId}`);
      userDB.data["email"] = user.email;

      if (userHouse.data) {
        userDB.data["dbIdHouse"] = userHouse.data.dbIdHouse;
      }

      setCurrentUserData(userDB.data);
    };

    //sets current user only once when component is mounted
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    if (currentUser) {
      getUserData(currentUser);
    }

    //the returned function unsubscribes the user whenever the component is unmounted
    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    currentUserData,
    signup,
    login,
    logout,
    updateUserEmail,
    resetPassword
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
