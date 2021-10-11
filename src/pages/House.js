import React from "react";

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
  Button,
} from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faFileInvoiceDollar,
  faMapMarkerAlt,
  faStar,
  faUsers,
  faCamera,
  faImages,
  faSwimmingPool,
  faDumbbell,
  faSink,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

//components
import FriendCard from "../components/FriendCard";

const styles = {
  houseInfo: {
    marginTop: "3em",
  },
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
  HMC: {
    display: "flex",
    justifyContent: "right",
    paddingRight: "2em",
  },
  button: {
    width: "100%",
  },
};

export default function House() {
  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="user circle" />
            Owner
          </Header>
        </Divider>
        <FriendCard options="owner" />
      </>

      <div style={styles.houseInfo}>
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
      </div>

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

      <div style={styles.houseInfo}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="home" />
            House Information
          </Header>
        </Divider>

        <Card style={styles.card} className="profileCard">
          <Row className=" align-items-center">
            <Col xs={12} sm={6}>
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Address Line 1
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="156 Streety Street"
                readOnly
              />

              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Address Line 2
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="156 Streety Street"
                readOnly
              />
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faUsers} style={styles.faIcon} />
                Residents
              </Form.Label>
              <h4 className="mt-0">4</h4>
            </Col>

            <Col xs={12} sm={6}>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faDollarSign} style={styles.faIcon} />
                House Value
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="250,000"
                  readOnly
                />
              </InputGroup>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon
                  icon={faFileInvoiceDollar}
                  style={styles.faIcon}
                />
                Rent Value
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="1,500"
                  readOnly
                />
              </InputGroup>

              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faStar} style={styles.faIcon} />
                Rating
              </Form.Label>
              <h4 className="mt-0">4.3</h4>
            </Col>
          </Row>
        </Card>
      </div>

      <div style={styles.houseInfo}>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="bath" />
            Utilties
          </Header>
        </Divider>

        <Card style={styles.card} className="profileCard">
          <Row>
            <Col xs={12} sm={6}>
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faSwimmingPool} style={styles.faIcon} />
                Pool
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="5 ft deep pool with new tiles"
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
                placeholder="Standard weight set, bench press, pelotons."
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
                placeholder="Stove, two fridges and granite countertop."
                readOnly
                as="textarea"
              />
            </Col>

            <Col xs={12} sm={6}>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faDollarSign} style={styles.faIcon} />
                Washer/Dryer
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  placeholder="Yes"
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
                  placeholder="N/A"
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
        </Card>
      </div>
    </Container>
  );
}
