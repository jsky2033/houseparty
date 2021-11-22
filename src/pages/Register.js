import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

//components
import RegisterForm from "../components/Forms/RegisterForm";

//firebase utility
import { useAuth } from "../contexts/AuthContext";

//apis
import { Auth } from "../requests/UserAPI";

export default function Register() {
  //STATE
  const [status, setStatus] = useState(null);
  //Auth Context
  const { signup } = useAuth();

  //BACKEND
  const usrRegister = async (registerData) => {
    setStatus("PENDING");
    try {
      //register email in firebase
      const response = await signup(registerData.email, registerData.password);
      const uid = response.user.uid;

      //register email in database
      const expressResponse = await Auth.post("/register", {
        authId: uid,
        username: registerData.name,
        phone: registerData.phone,
        email: registerData.email,
        membership: "User",
      });
      if (expressResponse.status !== 200) {
        throw new Error("Database Entry failed!");
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
