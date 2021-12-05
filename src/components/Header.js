import React from "react";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

//router dom components
import { Link } from "react-router-dom";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouseUser,
  faComments,
  faMapMarkedAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

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
          {currentUser ? (
            <>
              <Nav.Link>
                <Link
                  to={{
                    pathname: `/userhouse/${
                      currentUserData ? currentUserData.dbId : null
                    }`,
                  }}
                  className="topLinks"
                  style={styles.button}
                >
                  <FontAwesomeIcon icon={faHouseUser} style={styles.faIcon} />
                  Your House
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={{
                    pathname: `/userblog/${
                      currentUserData ? currentUserData.dbId : null
                    }`,
                  }}
                  className="topLinks"
                  style={styles.button}
                >
                  <FontAwesomeIcon icon={faHouseUser} style={styles.faIcon} />
                  Your Blog
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to={{
                    pathname: `/chat/${
                      currentUserData ? currentUserData.dbIdHouse : null
                    }`,
                  }}
                  className="topLinks"
                  style={styles.button}
                >
                  <FontAwesomeIcon icon={faComments} style={styles.faIcon} />
                  House Chat
                </Link>
              </Nav.Link>
              <Nav.Link href="/search" className="topLinks">
                <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.faIcon} />
                Map
              </Nav.Link>
              <Nav.Link href="/people" className="topLinks" s>
                <FontAwesomeIcon icon={faUsers} style={styles.faIcon} />
                People
              </Nav.Link>

              <NavDropdown title="Options" id="basic-nav-dropdown">
                <NavDropdown.Item href="/house">Edit House</NavDropdown.Item>
                <NavDropdown.Item href="/blog">Edit Blog</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : null}
        </Nav>

        <Nav></Nav>

        {!currentUser ? (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/profile" className="topLinks">
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
