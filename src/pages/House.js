import React, { useState, useEffect } from "react";

//house editing form
import HouseForm from "../components/Forms/HouseForm";

//Bootstrap
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
  Alert,
} from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faMapMarkerAlt,
  faSwimmingPool,
  faDumbbell,
  faSink,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

//components
import FriendCard from "../components/FriendCard";

//requests
import HouseAPI from "../requests/HouseAPI";

//use auth context
import { useAuth } from "../contexts/AuthContext";

const styles = {
  houseInfo: {},
  avatar: {
    width: "10em",
  },
  card: {
    padding: "3em",
    marginBottom: "2em",
  },
  faIcon: {
    marginRight: ".5em",
  },
  HMC: {
    display: "flex",
    justifyContent: "right",
    paddingRight: "2em",
  },
  button: {
    width: "100%",
  },
  houseInfoEmpty: {
    textAlign: "center",
  },
};

export default function House() {
  //getting user data from context
  const { currentUserData, currentUser } = useAuth();

  //STATE
  //Modal Handling for House Card
  const [houseStatus, setHouseStatus] = useState(null);
  const [showHouse, setShowHouse] = useState(null);
  const [showHouseInfo, setShowHouseInfo] = useState(null);

  const handleClose = () => {
    setShowHouse(false);
  };
  const handleShow = () => {
    setShowHouse(true);
    setHouseStatus(null);
  };

  const handleCloseInfo = () => {
    setShowHouseInfo(false);
  };
  const handleShowInfo = () => {
    setShowHouseInfo(true);
    setHouseStatus(null);
  };

  //house states
  const [houseData, setHouseData] = useState(null);
  const [houseInfo, setHouseInfo] = useState(null);

  //housemate states
  const [houseMates, setHouseMates] = useState([]);
  const [deletionStatus, setDeletionStatus] = useState(null);

  //API REQUESTS

  //Fetching house data and housemates

  useEffect(() => {
    let isActive = true;

    const getHouseData = async () => {
      const response = await HouseAPI.get(`/${currentUser.uid}`);
      if (response.data) {
        setHouseData(response.data);
        setHouseInfo(response.data.information);
      }
    };

    const getHouseMates = async () => {
      const response = await HouseAPI.get(`/houseMates/${currentUser.uid}`);
      if (response.data) {
        setHouseMates(response.data);
      }
    };

    const dataGets = async () => {
      await getHouseData();
      await getHouseMates();
    };

    if (isActive) {
      dataGets();
      setDeletionStatus(null);
    }

    return (isActive = false);
  }, [currentUser, deletionStatus, showHouse, showHouseInfo]);

  //Submission of House Card

  const editHouse = async (houseDataParam, houseInfoParam) => {
    setHouseStatus("PENDING");
    try {
      var response;
      //if the house already exists, update it
      if (houseData) {
        response = await HouseAPI.put(`/${currentUser.uid}`, {
          ...houseDataParam,
          authId: currentUser.uid,
          information: {
            ...houseInfoParam,
          },
        });
      } else { //otherwise create this house
        response = await HouseAPI.post(`/${currentUser.uid}`, {
          ...houseDataParam,
          authId: currentUser.uid,
        });
      }
      if (response.status === 200) {
        setHouseStatus("SUCCESS");
        handleClose();
        handleCloseInfo();
      } else {
        throw new Error("Database update failed");
      }
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setHouseStatus("LOGIN_AGAIN");
      } else {
        setHouseStatus("FAIL");
      }
    }
  };

  //delete Housemate

  const deleteHouseMate = async (dbId) => {
    setDeletionStatus("PENDING");
    try {
      const response = await HouseAPI.delete(`/${dbId}`, {
        data: {
          dbId: currentUserData.dbId,
          authId: currentUser.uid,
        },
      });

      if (response.status === 200) {
        setDeletionStatus("SUCCESS");
      } else {
        throw new Error("Error in housemate removal");
      }
    } catch (err) {
      setDeletionStatus("FAIL");
    }
  };

  //REPEATED COMPONENTS

  var rendered_mates;
  if (houseMates) {
    rendered_mates = houseMates.map((item, index) => {
      return (
        <Col key={index} className="mb-5">
          <FriendCard
            options="friends"
            name={item.username}
            deleteHouseMate={deleteHouseMate}
            dbId={item.dbId}
          />
        </Col>
      );
    });
  }

  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user circle" />
            Owner
          </Header>
        </Divider>
        <div style={{ marginBottom: "3em" }}>
          <FriendCard
            options="owner"
            name={currentUserData ? currentUserData.username : null}
            email={currentUserData ? currentUserData.email : null}
          />
        </div>
      </>

      {/* <div style={styles.houseInfo}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="images" />
            Gallery
          </Header>
        </Divider>

        <Card style={styles.card}>
          <Row className="row-cols-1 row-cols-sm-2 align-items-center">
            <Col>
              <Image
                src="/pictures/house/testImages/test1.jpg"
                fluid
                thumbnail
              ></Image>
            </Col>
            <Col>
              <Button
                style={styles.button}
                className="btn-lg mt-3 mt-sm-0 mb-3"
              >
                <FontAwesomeIcon icon={faCamera} style={styles.faIcon} />
                Upload Photo
              </Button>
              <Button style={styles.button} className="btn-lg">
                <FontAwesomeIcon icon={faImages} style={styles.faIcon} />
                View Gallery
              </Button>
            </Col>
          </Row>
        </Card>
      </div> */}

      <div style={styles.houseInfo}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="home" />
            House
          </Header>
        </Divider>
        <Card style={styles.card} className="houseCard" onClick={handleShow}>
          {houseData ? (
            <>
              <Row>
                <Col xs={12} md={6}>
                  <Image
                    fluid
                    thumbnail
                    src="/pictures/house/testImages/test1.jpg"
                  ></Image>
                </Col>
                <Col xs={12} md={6} className="mt-3 mt-md-0">
                  <h2>Description</h2>
                  <p className="lead">
                    {houseData ? houseData.description : null}
                  </p>

                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={styles.faIcon}
                    />
                    Address
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={houseData ? houseData.address : null}
                    readOnly
                  />

                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    <FontAwesomeIcon
                      icon={faMapMarkerAlt}
                      style={styles.faIcon}
                    />
                    Zip Code
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={houseData ? houseData.zipCode : null}
                    readOnly
                  />
                </Col>
              </Row>
            </>
          ) : (
            <div style={styles.houseInfoEmpty}>
              <Icon name="plus" />
              <Icon name="home" />
              <h3>Add a House</h3>
            </div>
          )}
        </Card>
        <Modal show={showHouse} onHide={handleClose}>
          <HouseForm
            editHouse={editHouse}
            houseStatus={houseStatus}
            userHouse={houseData}
            type="description"
          />
        </Modal>
      </div>

      {houseMates.length !== 0 ? (
        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="user" />
              Housemates
            </Header>
          </Divider>
          {deletionStatus === "SUCCESS" ? (
            <Alert variant="success">Housemate Removed</Alert>
          ) : deletionStatus === "PENDING" ? (
            <Alert variant="warning">Removing Housemate...</Alert>
          ) : deletionStatus === "FAIL" ? (
            <Alert variant="danger">An error has ocurred</Alert>
          ) : null}
          <Row className="row-cols-1 ">{rendered_mates}</Row>
        </>
      ) : (
        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="user plus" />
              Housemates
            </Header>
          </Divider>

          <Row className="row-cols-1">
            <Card
              style={styles.card}
              className="houseCard"
              onClick={() => (window.location = "/people")}
            >
              <div style={styles.houseInfoEmpty}>
                <Icon name="plus" />
                <Icon name="user" />
                <h3>Add Housemates</h3>
              </div>
            </Card>
          </Row>
        </>
      )}

      <div style={styles.houseInfo}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="home" />
            House Information
          </Header>
        </Divider>
        <Card
          style={styles.card}
          className="houseCard"
          onClick={handleShowInfo}
        >
          {houseData ? (
            <>
              <Row>
                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    <FontAwesomeIcon
                      icon={faSwimmingPool}
                      style={styles.faIcon}
                    />
                    Pool
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={houseInfo ? houseInfo.poolDesc : null}
                    readOnly
                    as="textarea"
                  />

                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    <FontAwesomeIcon icon={faDumbbell} style={styles.faIcon} />
                    Gym
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={houseInfo ? houseInfo.gymDesc : null}
                    readOnly
                    as="textarea"
                  />
                  <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                    <FontAwesomeIcon icon={faSink} style={styles.faIcon} />
                    Kitchen
                  </Form.Label>
                  <Form.Control
                    className="mb-2"
                    id="inlineFormInput"
                    placeholder={houseInfo ? houseInfo.kitchenDesc : null}
                    readOnly
                    as="textarea"
                  />
                </Col>

                <Col xs={12} sm={6}>
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      style={styles.faIcon}
                    />
                    Washer/Dryer
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl
                      id="inlineFormInputGroup"
                      placeholder={houseInfo ? houseInfo.laundryDesc : null}
                      readOnly
                    />
                  </InputGroup>
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    <FontAwesomeIcon icon={faTree} style={styles.faIcon} />
                    Garden/Yard
                  </Form.Label>
                  <InputGroup className="mb-2">
                    <FormControl
                      id="inlineFormInputGroup"
                      placeholder={houseInfo ? houseInfo.gardenDesc : null}
                      readOnly
                    />
                  </InputGroup>
                </Col>
              </Row>
              <Modal show={showHouseInfo} onHide={handleCloseInfo}>
                <HouseForm
                  editHouse={editHouse}
                  houseStatus={houseStatus}
                  userHouse={houseData}
                  type="information"
                />
              </Modal>
            </>
          ) : (
            <div style={styles.houseInfoEmpty}>
              <h3>You have not created a house yet</h3>
            </div>
          )}
        </Card>
      </div>
    </Container>
  );
}
