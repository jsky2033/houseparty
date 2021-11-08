import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

//components
import LoginForm from "../components/Forms/LoginForm";

//requests
// import User from "../requests/User";

//firebase utility
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  //STATE
  const [status, setStatus] = useState(null);
  //Auth Context
  const { login } = useAuth();

  //ONLOAD
  useEffect(() => {
    if (status === "SUCCESS") {
      window.location = "/";
    }
  }, [status]);

  //BACKEND
  const usrLogin = async (loginData) => {
    setStatus("PENDING");
    try {
      await login(loginData.email, loginData.password);
      setStatus("SUCCESS");
    } catch (err) {
      console.log(err);
      setStatus("FAIL");
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col lg={5}>
          <LoginForm status={status} usrLogin={usrLogin} />
        </Col>
      </Row>
    </Container>
  );
}
