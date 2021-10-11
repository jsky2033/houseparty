import React from "react";

//Bootstrap
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const styles = {
  houseIcon: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2em",
  },
  card: {
    height: "25em",
  },
  cardImg: {
    padding: "3em",
  },
};

export default function Home() {
  return (
    <Container>
      <>
        <h1 className="text-center mb-3 display-3">Welcome to HouseParty</h1>
        <div style={styles.houseIcon}>
          <Image
            src="./pictures/home/houseHeader.svg"
            fluid
            className="houseIcon"
          ></Image>
        </div>
        <p className="lead text-center">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          eum totam odit voluptates repellendus adipisci facere quos, similique
          nisi modi aperiam cupiditate fugit hic porro, architecto eveniet!
          Laborum, labore omnis.
        </p>
      </>

      <>
        <h1 className="text-center mb-3 display-3">Connect</h1>
        <Row className="align-items-center row-cols-1 row-cols-md-2">
          <Col>
            <Image src="./pictures/home/post1.jpg" fluid thumbnail></Image>
          </Col>
          <Col>
            <h3 className="mt-3 mt-sm-0">Become part of your community</h3>
            <p className="lead">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos eum totam odit voluptates repellendus adipisci facere
              quos, similique nisi modi aperiam cupiditate fugit hic porro,
              architecto eveniet! Laborum, labore omnis.
            </p>
          </Col>
        </Row>
      </>

      <>
        <h1 className="text-center mb-3 display-3 mt-3">Explore</h1>
        <Row className="align-items-center row-cols-1 row-cols-md-2 flex-md-row-reverse ">
          <Col>
            <Image src="./pictures/home/post2.jpg" fluid thumbnail></Image>
          </Col>
          <Col>
            <h3 className="mt-3 mt-sm-0">Explore your city</h3>
            <p className="lead">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Dignissimos eum totam odit voluptates repellendus adipisci facere
              quos, similique nisi modi aperiam cupiditate fugit hic porro,
              architecto eveniet! Laborum, labore omnis.
            </p>
          </Col>
        </Row>
      </>

      <>
        <h1 className="text-center mb-3 display-3 mt-3">Experience</h1>
        <Row className="row-cols-1 row-cols-md-3 mb-5 gy-3">
          <Col className="mb-3 mb-md-0">
            <Card style={styles.card} className="homeCard">
              <Card.Img
                variant="top"
                src="/pictures/home/buildHome.svg"
                style={styles.cardImg}
              />
              <Card.Body>
                <Card.Title>Build your House</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dignissimos eum totam odit voluptates repellendus adipisci
                  facere
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col className="mb-3 mb-md-0">
            <Card style={styles.card} className="homeCard">
              <Card.Img
                variant="top"
                src="/pictures/home/houseFriends.svg"
                style={styles.cardImg}
              />
              <Card.Body>
                <Card.Title>Find new friends</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dignissimos eum totam odit voluptates repellendus adipisci
                  facere
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={styles.card} className="homeCard">
              <Card.Img
                variant="top"
                src="/pictures/home/houseSearch.svg"
                style={styles.cardImg}
              />
              <Card.Body>
                <Card.Title>Look for Houses</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Dignissimos eum totam odit voluptates repellendus adipisci
                  facere
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    </Container>
  );
}
