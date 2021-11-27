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
  faPhone,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

//components
import ProfileForm from "../components/Forms/ProfileForm";

//requests
import User from "../requests/UserAPI";

//auth context
import { useAuth } from "../contexts/AuthContext";

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
  const handleClose = () => {
    window.location.reload();
    setShowProfile(false);
  };
  const handleShow = () => {
    setShowProfile(true);
    setProfileStatus(null);
  };
  //Auth Context
  const { updateUserEmail, currentUserData, currentUser } = useAuth();

  //BACKEND

  //Submission of Profile Card
  const editProfile = async (profileData) => {
    setProfileStatus("PENDING");
    try {
      //update email in firebase
      await updateUserEmail(profileData.email);

      //update user in database
      const { email, ...other } = profileData;
      const response = await User.put(`/${currentUser.uid}`, {
        ...other,
        authId: currentUser.uid,
      });
      if (response.status === 200) {
        setProfileStatus("SUCCESS");
      } else {
        throw new Error("Database update failed");
      }
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setProfileStatus("LOGIN_AGAIN");
      } else {
        setProfileStatus("FAIL");
      }
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
                placeholder={currentUserData ? currentUserData.username : null}
                readOnly
              />
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faEnvelope} style={styles.faIcon} />
                Email
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder={currentUserData ? currentUserData.email : null}
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
                  placeholder={currentUserData ? currentUserData.phone : null}
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
            userProfile={currentUserData}
          />
        </Modal>
      </>

      
    </Container>
  );
}
