import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

//components
import RegisterForm from "../components/Forms/RegisterForm";

//firebase utility
import { useAuth } from "../contexts/AuthContext";

//apis
import User from "../requests/User";

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
      const expressResponse = await User.post("/registerUsr", {
        uid: uid,
        email: registerData.email,
        name: registerData.name,
        phone: "",
      });
      if (expressResponse.status !== 204) {
        throw new Error("Database Entry failed!");
      }
    } catch (err) {
      setStatus("FAIL");
      console.log(err);
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
