import React, { useState, useEffect } from "react";

//router components
import { Link } from "react-router-dom";

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

const styles = {
  avatar: {
    width: "10em",
  },
  card: {
    padding: "3em",
    marginBottom: "2em",
  },
  card2: {
    height: "25em",
  },
  cardImg: {
    padding: "2em",
    width: "20em",
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
  modal: {
    padding: "4em",
  },
  houseInfoEmpty: {
    padding: "2em",
    textAlign: "center",
  },
};

export default function UserHouse({ match }) {
  //STATE
  //Modal Handling for House Card
  const [showHouseInfo, setShowHouseInfo] = useState(null);

  const handleCloseInfo = () => {
    setShowHouseInfo(false);
  };
  const handleShowInfo = () => {
    setShowHouseInfo(true);
  };
  //Modal Handling for House Mates
  const [showHouseMates, setShowHouseMates] = useState(null);

  const handleCloseHm = () => {
    setShowHouseMates(false);
  };
  const handleShowHm = () => {
    setShowHouseMates(true);
  };
  //house states
  const [houseOverView, setHouseOverView] = useState(null);

  //API REQUESTS

  //Fetching house data and housemates

  useEffect(() => {
    let isActive = true;

    //extract dbId from navigation data
    const dbId = match.params.dbId;

    //get overview of house
    const getHouseOverview = async () => {
      const response = await HouseAPI.get(`/houseOverview/${dbId}`);
      if (response.data) {
        setHouseOverView(response.data);
      }
    };

    const dataGets = async () => {
      await getHouseOverview();
    };

    if (isActive) {
      dataGets();
    }

    return (isActive = false);
  }, [match]);

  console.log(houseOverView);

  //REPEATED COMPONENTS

  var rendered_mates;
  if (houseOverView) {
    rendered_mates = houseOverView.housemates.map((item, index) => {
      return (
        <Col key={index} className="mb-5">
          <FriendCard
            options="housemate-view"
            name={item.username}
            dbId={item.dbId}
          />
        </Col>
      );
    });
  }

  if (houseOverView) {
    return (
      <Container>
        <div style={styles.houseInfo}>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="home" />
              House
            </Header>
          </Divider>
          <Card
            style={styles.card}
            className="houseCard"
            onClick={handleShowInfo}
          >
            {houseOverView.house ? (
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
                    <p className="lead">{houseOverView.house.description}</p>

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
                      placeholder={houseOverView.house.address}
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
                      placeholder={houseOverView.house.zipCode}
                      readOnly
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <div style={styles.houseInfoEmpty}>
                <Icon name="home" />
                <Icon name="question" />
                <h3>User has not created a house yet</h3>
              </div>
            )}
          </Card>
          <Modal show={showHouseInfo} onHide={handleCloseInfo}>
            <Row>
              <Col xs={12} style={styles.modal}>
                <h2 className="text-center">Ameneties</h2>
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
                  placeholder={houseOverView.information.poolDesc}
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
                  placeholder={houseOverView.information.gymDesc}
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
                  placeholder={houseOverView.information.kitchenDesc}
                  readOnly
                  as="textarea"
                />

                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                  <FontAwesomeIcon icon={faDollarSign} style={styles.faIcon} />
                  Washer/Dryer
                </Form.Label>
                <InputGroup className="mb-2">
                  <FormControl
                    id="inlineFormInputGroup"
                    placeholder={houseOverView.information.laundryDesc}
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
                    placeholder={houseOverView.information.gardenDesc}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
          </Modal>
        </div>

        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="user circle" />
              Owner
            </Header>
          </Divider>
          <div style={{ marginBottom: "3em" }}>
            <FriendCard
              options="owner-view"
              name={houseOverView.owner.username}
              phone={houseOverView.owner.phone}
            />
          </div>
        </>

        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="eject" />
              Features
            </Header>
          </Divider>
          <Row className="row-cols-1 row-cols-md-3 mb-5 gy-3">
            <Col className="mb-3 mb-md-0">
              <Card
                style={styles.card2}
                className="homeCard d-flex align-items-center"
                onClick={handleShowHm}
              >
                <Card.Title className="mt-3">See Housemates</Card.Title>
                <Card.Img
                  variant="top"
                  src="/pictures/house/default/housemates.svg"
                  style={styles.cardImg}
                />
              </Card>
            </Col>

            <Col className="mb-3 mb-md-0 ">
              <Link
                to={{ pathname: `/userblog/${match ? match.params.dbId : null}` }}
              >
                <Card
                  style={styles.card2}
                  className="homeCard d-flex align-items-center"
                >
                  <Card.Title className="mt-3 mb-5" style={{ color: "black" }}>
                    Check out the Blog!
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src="/pictures/house/default/blog2.svg"
                    style={styles.cardImg}
                  />
                </Card>
              </Link>
            </Col>
            <Col>
              <Link
                to={{ pathname: `/search/${match ? match.params.dbId : null}` }}
              >
                <Card
                  style={styles.card2}
                  className="homeCard d-flex align-items-center"
                >
                  <Card.Title className="mt-3 mb-5" style={{ color: "black" }}>
                    Locate House on Map
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src="/pictures/house/default/map.svg"
                    style={styles.cardImg}
                  />
                </Card>
              </Link>
            </Col>
          </Row>
        </>

        <Modal show={showHouseMates} onHide={handleCloseHm}>
          {houseOverView.housemates.length !== 0 ? (
            <div className="p-4">
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="user" />
                  Housemates
                </Header>
              </Divider>

              <Row className="row-cols-1 ">{rendered_mates}</Row>
            </div>
          ) : (
            <div className="p-4">
              <Divider horizontal>
                <Header as="h4">
                  <Icon name="users" />
                  Housemates
                </Header>
              </Divider>

              <Row className="row-cols-1">
                <div style={styles.houseInfoEmpty}>
                  <h3>No housemates present yet</h3>
                  <Icon name="user" />
                  <Icon name="question" />
                </div>
              </Row>
            </div>
          )}
        </Modal>
      </Container>
    );
  } else {
    return null;
  }
}
