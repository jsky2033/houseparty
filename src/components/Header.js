import React from "react";

import { Navbar, Nav } from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

//firebase context
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  //Auth Context
  const { logout, currentUser, currentUserData } = useAuth();

  //logout handler
  const logoutUser = async () => {
    try {
      await logout();
      window.location = "/login";
    } catch (err) {
      alert(err);
    }
  };

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
          <Nav.Link href="/people">People</Nav.Link>
        </Nav>
        {!currentUser ? (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link>
              <FontAwesomeIcon icon={faUser} style={styles.faIcon} />
              {currentUserData ? currentUserData.username : null}
            </Nav.Link>
            <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
