import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Image,
  Form,
  InputGroup,
  FormControl,
  Modal,
} from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faEnvelope,
  faHouseUser,
  faMapMarkerAlt,
  faPhone,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

//components
import FriendCard from "../components/FriendCard";
import ProfileForm from "../components/Forms/ProfileForm";

//requests
import User from "../requests/User";

export default function Profile() {
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
    userCont: {
      display: "flex",
      justifyContent: "center",
    },
  };

  //STATE
  //Modal Handling for Profile Card
  const [profileStatus, setProfileStatus] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const handleClose = () => setShowProfile(false);
  const handleShow = () => {
    setShowProfile(true);
    setProfileStatus(null);
  };

  //BACKEND
  //Submission of Profile Card
  const editProfile = async (profileData) => {
    setProfileStatus("PENDING");
    try {
      const response = await User.post("/editProfile", profileData);
      if (response.status === 204) {
        setProfileStatus("SUCCESS");
      }
    } catch (err) {
      setProfileStatus("FAIL");
    }
  };

  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user circle" />
            Profile
          </Header>
        </Divider>
        <Card
          style={styles.card}
          className="profileCard"
          onClick={() => handleShow()}
        >
          <Row>
            <Col xs={12} sm={2} className="align-self-center">
              <div style={styles.userCont}>
                <Image
                  src="/pictures/profile/default/m_avatar.svg"
                  fluid
                  roundedCircle
                  style={styles.avatar}
                ></Image>
              </div>
            </Col>

            <Col xs={12} sm={5}>
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faUser} style={styles.faIcon} />
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
                readOnly
              />
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faEnvelope} style={styles.faIcon} />
                Email
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="123@gmail.com"
                  readOnly
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
                  readOnly
                />
              </InputGroup>
            </Col>

            <Col xs={12} sm={5}>
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
            </Col>
          </Row>
        </Card>
        <Modal show={showProfile} onHide={handleClose}>
          <ProfileForm
            editProfile={editProfile}
            profileStatus={profileStatus}
          />
        </Modal>
      </>

      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="home" />
            House
          </Header>
        </Divider>
        <Card style={styles.card} className="profileCard">
          <Row>
            <Col xs={12} md={6}>
              <Image
                fluid
                thumbnail
                src="/pictures/profile/testImages/test1.jpg"
              ></Image>
            </Col>
            <Col xs={12} md={6} className="mt-3 mt-md-0">
              <h2>Description</h2>
              <p className="lead">
                Sit amet consectetur adipisicing elit. Dignissimos eum totam
                odit voluptates repellendus adipisci facere quos, similique nisi
                modi aperiam
              </p>

              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Address Line 1
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
                readOnly
              />

              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Address Line 2
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
                readOnly
              />
            </Col>
          </Row>
        </Card>
      </>

      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user plus" />
            Housemates
          </Header>
        </Divider>

        <Row className="row-cols-1 mb-5">
          <Col>
            <FriendCard options="friends" />
          </Col>

          <Col className="mt-5">
            <FriendCard options="friends" />
          </Col>
        </Row>
      </>
    </Container>
  );
}
