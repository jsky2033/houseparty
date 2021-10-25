import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

//components
import RegisterForm from "../components/Forms/RegisterForm";

//requests
import User from "../requests/User";

export default function Register() {
  //STATE
  //Modal Handling for Profile Card
  const [status, setStatus] = useState(null);

  //BACKEND
  //Submission of Profile Card
  const usrRegister = async (loginData) => {
    setStatus("PENDING");
    try {
      const response = await User.post("/registerUsr", loginData);
      if (response.status === 204) {
        setStatus("SUCCESS");
      }
    } catch (err) {
      setStatus("FAIL");
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col lg={5}>
          <RegisterForm status={status} usrRegister={usrRegister} />
        </Col>
      </Row>
    </Container>
  );
}
