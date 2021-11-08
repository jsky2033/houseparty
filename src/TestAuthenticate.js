import React, { useState } from "react";
import { Container } from "react-bootstrap";

//firebase functions
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
//provider
import { auth } from "./firebase";

export default function TestAuthenticate() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // user state
  const [user, setUser] = useState({});

  // will trigger when auth variable supplied is changed
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const reg_user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(reg_user);
    } catch (err) {
      alert(err);
    }
  };

  const login = async () => {
    try {
      const login_user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(login_user);
    } catch (err) {
      alert(err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Container>
      <h3>Register</h3>
      <input
        placeholder="Email..."
        value={registerEmail}
        onChange={(e) => {
          setRegisterEmail(e.target.value);
        }}
      ></input>
      <input
        placeholder="Password..."
        value={registerPassword}
        onChange={(e) => {
          setRegisterPassword(e.target.value);
        }}
      ></input>
      <button onClick={register}>Create User</button>

      <h3>Login</h3>
      <input
        placeholder="Email..."
        value={loginEmail}
        onChange={(e) => {
          setLoginEmail(e.target.value);
        }}
      ></input>
      <input
        placeholder="Password..."
        value={loginPassword}
        onChange={(e) => {
          setLoginPassword(e.target.value);
        }}
      ></input>
      <button onClick={login}>Login</button>

      <h4> User Logged In: {user ? user.email : null}</h4>
      <button onClick={logout}>Sign Out</button>
    </Container>
  );
}
