import React from "react";

//bootstrap
import { Container, Form, Image, Row, Col, Card } from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faStar } from "@fortawesome/free-solid-svg-icons";

//components
import FriendCard from "../components/FriendCard";

export default function Search() {
  const styles = {
    map: {
      height: "40em",
      border: "none",
    },
    selectSection: {
      marginTop: "3em",
    },
    selectedHouse: {
      height: "100%",
    },
  };
  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="map" />
            Map
          </Header>
        </Divider>
      </>

      <Row className="mb-5">
        <Col xs={12} sm={8}>
          <Card className="p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175453420647!2d-73.98784413479707!3d40.748440379327945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9aeb1c6b5%3A0x35b1cfbc89a6097f!2sEmpire+State+Building%2C+350+5th+Ave%2C+New+York%2C+NY+10118%2C+USA!5e0!3m2!1sda!2sdk!4v1491841211721"
              allowfullscreen="true"
              style={styles.map}
              title="Map"
            ></iframe>
          </Card>
        </Col>
        <Col className="mt-3 mt-sm-0">
          <Card style={styles.selectedHouse} className="profileCard p-4">
            <Row>
              <Col xs={12}>
                <h3>Selected House</h3>
                <Image
                  fluid
                  thumbnail
                  src="/pictures/profile/testImages/test1.jpg"
                ></Image>
              </Col>
              <Col xs={12} className="mt-3 ">
                <h2>Description</h2>
                <p className="lead">
                  Sit amet consectetur adipisicing elit. Dignissimos eum totam
                  odit voluptates repellendus adipisci facere quos, similique
                  nisi modi aperiam
                </p>
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                  <FontAwesomeIcon icon={faUsers} style={styles.faIcon} />
                  Residents
                </Form.Label>
                <h4 className="mt-0">4</h4>
                <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                  <FontAwesomeIcon icon={faStar} style={styles.faIcon} />
                  Rating
                </Form.Label>
                <h4 className="mt-0">4.3</h4>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="users" />
            Selected House Residents
          </Header>
        </Divider>

        <Row className="row-cols-1 mb-5">
          <Col>
            <FriendCard options={false} />
          </Col>

          <Col className="mt-5">
            <FriendCard options={false} />
          </Col>
        </Row>
      </>
    </Container>
  );
}
