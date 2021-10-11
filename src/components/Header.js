import React from "react";

import { Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="/">HouseParty</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/house">House</Nav.Link>
          <Nav.Link href="/house-blog">Blog</Nav.Link>
          <Nav.Link href="/house-search">Search</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
