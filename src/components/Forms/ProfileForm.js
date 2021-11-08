import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faEnvelope,
  faHouseUser,
  faPhone,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function ProfileForm({
  editProfile,
  profileStatus,
  userProfile,
}) {
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
    },
  };

  //STATE
  const [profileData, setProfileData] = useState({
    ...userProfile,
  });

  //event handlers
  const profileDataUpdate = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setProfileData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  const onSubmit = () => {
    editProfile(profileData);
  };

  return (
    <div style={styles.card}>
      {profileStatus === "SUCCESS" ? (
        <Alert variant="success">Profile Information Changed</Alert>
      ) : profileStatus === "PENDING" ? (
        <Alert variant="warning">Changing Settings...</Alert>
      ) : profileStatus === "FAIL" ? (
        <Alert variant="danger">An error has ocurred</Alert>
      ) : profileStatus === "LOGIN_AGAIN" ? (
        <Alert variant="danger">Please login again to change settings</Alert>
      ) : null}
      <h1 className="text-center">Edit Profile</h1>
      <Row>
        <Col xs={12}>
          <Form.Label htmlFor="inlineFormInput" visuallyHidden>
            <FontAwesomeIcon icon={faUser} style={styles.faIcon} />
            Name
          </Form.Label>
          <Form.Control
            className="mb-2"
            id="inlineFormInput"
            placeholder="Jane Doe"
            name="name"
            value={profileData.name}
            onChange={profileDataUpdate}
          />
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faEnvelope} style={styles.faIcon} />
            Email
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="123@gmail.com"
              name="email"
              value={profileData.email}
              onChange={profileDataUpdate}
            />
          </InputGroup>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faPhone} style={styles.faIcon} />
            Phone
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="+ 321 456 7890"
              name="phone"
              value={profileData.phone}
              onChange={profileDataUpdate}
            />
          </InputGroup>
        </Col>

        <Col xs={12}>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faCubes} style={styles.faIcon} />
            Membership
          </Form.Label>
          <InputGroup className="mb-2">
            <FormControl
              id="inlineFormInputGroup"
              placeholder="User"
              readOnly
            />
          </InputGroup>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faUsers} style={styles.faIcon} />
            Friends
          </Form.Label>
          <h4 className="mt-0">4</h4>
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
            <FontAwesomeIcon icon={faHouseUser} style={styles.faIcon} />
            Houses
          </Form.Label>
          <h4 className="mt-0">1</h4>
          <Button style={styles.btn} size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}
