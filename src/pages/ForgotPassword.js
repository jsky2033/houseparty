import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

//firebase utility
import { useAuth } from "../contexts/AuthContext";


export default function Login() {
  //STATE
  const [status, setStatus] = useState(null);
  const [email, setEmail] = useState(null);
  //Auth Context
  const { resetPassword } = useAuth();

  //ONLOAD
  useEffect(() => {}, [status]);

  //EVENT HANDLER
  const passwordReset = async (event) => {
    event.preventDefault();
    setStatus("PENDING");
    try {
      await resetPassword(email);
      setStatus("SUCCESS");
    } catch (err) {
      setStatus("FAIL");
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col lg={5}>
          <Card className="p-5">
            {status === "SUCCESS" ? (
              <Alert variant="success">
                A password reset email has been sent to your inbox
              </Alert>
            ) : status === "PENDING" ? (
              <Alert variant="warning">Resetting Password...</Alert>
            ) : status === "FAIL" ? (
              <Alert variant="danger">Password Reset Failure</Alert>
            ) : null}
            <h2 className="text-center">Reset Password</h2>
            <Form onSubmit={passwordReset}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter your email</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                />
              </Form.Group>
              <Button variant="primary" type="submit" style={{ width: "100%" }}>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
