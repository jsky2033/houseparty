import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Image,
  Card,
} from "react-bootstrap";

//router dom
import { Link } from "react-router-dom";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

//helper functions
import { validateInput } from "../../utilities/main";

export default function LoginForm({ usrLogin, status }) {
  //styles
  const styles = {
    avatar: {
      width: "10em",
    },
    card: {
      padding: "3em",
    },
    faIcon: {
      marginRight: ".5em",
    },
    btn: {
      width: "100%",
      marginTop: "1em",
    },
  };

  //STATE
  const [usrData, setUsrData] = useState({
    email: "",
    password: "",
  });
  const [validationMsg, setValidationMsg] = useState(null);

  //event handlers
  const profileDataUpdate = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setUsrData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const onSubmit = () => {
    let checkInput = validateInput(usrData);
    if (checkInput) {
      setValidationMsg(checkInput);
    } else {
      setValidationMsg(null);
      usrLogin(usrData);
    }
  };

  return (
    <Card style={styles.card}>
      {status === "SUCCESS" ? (
        <Alert variant="success">Login Success</Alert>
      ) : status === "PENDING" ? (
        <Alert variant="warning">Logging in...</Alert>
      ) : status === "FAIL" ? (
        <Alert variant="danger">Login Failure</Alert>
      ) : null}
      {validationMsg ? <Alert variant="warning">{validationMsg}</Alert> : null}

      <h1 className="text-center">Login</h1>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Image
            style={styles.avatar}
            src="/pictures/profile/default/m_avatar.svg"
            fluid
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faEnvelope} style={styles.faIcon} />
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="123@gmail.com"
              type="email"
              name="email"
              value={usrData.email}
              onChange={profileDataUpdate}
              required
            />
          </InputGroup>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faKey} style={styles.faIcon} />
            Password
          </Form.Label>

          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              type="password"
              name="password"
              value={usrData.password}
              onChange={profileDataUpdate}
              required
            />
          </InputGroup>
          <div className="text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <Button style={styles.btn} size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
