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

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

//helper functions
import { validateInput } from "../../utilities/main";

export default function RegisterForm({ usrRegister, status }) {
  //styles
  const styles = {
    avatar: {
      width: "10em",
    },
    card: {
      padding: "3em",
      marginBottom: "3em",
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
    name: "",
    email: "",
    password: "",
    phone: "",
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
      usrRegister(usrData);
    }
  };

  return (
    <Card style={styles.card}>
      {status === "SUCCESS" ? (
        <Alert variant="success">Registration Success</Alert>
      ) : status === "PENDING" ? (
        <Alert variant="warning">Registering User...</Alert>
      ) : status === "FAIL" ? (
        <Alert variant="danger">Registration Failure</Alert>
      ) : null}
      {validationMsg ? <Alert variant="warning">{validationMsg}</Alert> : null}
      <h1 className="text-center">Register</h1>
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
            <FontAwesomeIcon icon={faUser} style={styles.faIcon} />
            Name
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="John Smith"
              type="text"
              name="name"
              value={usrData.name}
              onChange={profileDataUpdate}
              required
            />
          </InputGroup>
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
            <FontAwesomeIcon icon={faPhone} style={styles.faIcon} />
            Phone
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="***-***-****"
              type="text"
              name="phone"
              value={usrData.phone}
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
          <Button style={styles.btn} size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Card>
  );
}
