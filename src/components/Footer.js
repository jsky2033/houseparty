import React from "react";

//bootstrap
import { Container, Row, Col } from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-light sticky-bottom">
      <Container className="py-3 py-sm-5 ">
        <Row className="row-cols row row-cols-1 row-cols-md-2 row-cols-lg-4 text-center text-md-start">
          <Col>
            <h6>About</h6>
            <ul className="list-unstyled">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="index.html">Services</a>
              </li>
              <li>
                <a href="index.html">About</a>
              </li>
              <li>
                <a href="index.html">Team</a>
              </li>
              <li>
                <a href="index.html">Contact</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h6>Legal Information</h6>
            <ul className="list-unstyled">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="index.html">Services</a>
              </li>
              <li>
                <a href="index.html">About</a>
              </li>
              <li>
                <a href="index.html">Team</a>
              </li>
              <li>
                <a href="index.html">Contact</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h6>FAQ</h6>
            <ul className="list-unstyled">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>
                <a href="index.html">Services</a>
              </li>
              <li>
                <a href="index.html">About</a>
              </li>
              <li>
                <a href="index.html">Team</a>
              </li>
              <li>
                <a href="index.html">Contact</a>
              </li>
            </ul>
          </Col>
          <Col>
            <h6>Our Location</h6>
            <address>
              <strong>HouseParty</strong>
              <br />
              123 Maple Street
              <br />
              32601, Gainesville
              <br />
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+1234567890"> (123) 456-7890</a>
              <br />
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="tel:+1234567890"> jsky2033@gmail.com</a>
            </address>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
