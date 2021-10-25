import React, { useState, useEffect } from "react";

import { Navbar, Nav } from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//apis
import { logoutApi } from "../utilities/main";
import User from "../requests/User";

export default function Header({ isLoggedIn }) {
  const [user, setUser] = useState({ name: "Johan", email: "" });

  //data retriever
  // let isActive = true;
  // const getUsrData = async () => {
  //   const response = await User.get("/getUsrData");
  //   if (isActive) {
  //     setUser(response.data);
  //   }
  // };

  // useEffect(() => {
  //   getUsrData();
  //   return () => {
  //     isActive = false;
  //   };
  // }, []);

  //STYLES

  const styles = {
    faIcon: {
      marginRight: ".5em",
    },
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/">HouseParty</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/house">House</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
          <Nav.Link href="/search">Search</Nav.Link>
        </Nav>
        {!isLoggedIn ? (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link>
              <FontAwesomeIcon icon={faUser} style={styles.faIcon} />
              {user.name}
            </Nav.Link>
            <Nav.Link onClick={() => logoutApi()}>Logout</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
