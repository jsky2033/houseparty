import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";

//components
import LoginForm from "../components/Forms/LoginForm";

//requests
// import User from "../requests/User";

//test login
import { loginApi } from "../utilities/main";

export default function Login() {
  //STATE
  //Modal Handling for Profile Card
  const [status, setStatus] = useState(null);

  //ONLOAD
  useEffect(() => {
    if (status === "SUCCESS") {
      window.location = "/";
    }
  }, [status]);

  //BACKEND
  //Submission of Profile Card
  const usrLogin = async (loginData) => {
    setStatus("PENDING");
    try {
      // const response = await User.post("/loginUsr", loginData);
      const response = { status: 204 };
      if (response.status === 204) {
        setStatus("SUCCESS");
        loginApi();
      }
    } catch (err) {
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
