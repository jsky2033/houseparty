import React from "react";

//bootstrap
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function Blog() {
  const styles = {
    button: {
      width: "100%",
    },
    faIcon: {
      marginRight: "1em",
    },
  };

  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="paste" />
            Make New Post
          </Header>
        </Divider>
      </>

      <Form>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Enter Title</Form.Label>
          <Form.Control type="text" placeholder="Blog Title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            as="textarea"
          />
        </Form.Group>

        <Row className="row-cols-1 mb-4">
          <Col>
            <Button className="mt-3 screenButton" size="lg">
              <FontAwesomeIcon icon={faCamera} style={styles.faIcon} />
              Upload Photo
            </Button>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 screenButton"
              size="lg"
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="newspaper" />
            Posts
          </Header>
        </Divider>

        <Row className="mb-4">
          <Col></Col>
          <Col xs={12} sm={7}>
            <Card>
              <Card.Img
                variant="top"
                src="/pictures/blog/testImages/test2.jpg"
              />
              <Card.Body>
                <Card.Title>Tennessee Game Party</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                  illum fuga aliquid. Magni, error itaque!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </>
    </Container>
  );
}
