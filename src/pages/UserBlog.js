import React, { useState, useEffect } from "react";

//bootstrap
import { Container, Row, Col, Card } from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//requests
import PostAPI from "../requests/PostAPI";

export default function Blog({ match }) {
  //STATE
  const [posts, setPosts] = useState([]);

  //STYLES
  const styles = {
    postCard: {
      marginBottom: "3em",
    },
  };

  //USE EFFECT

  useEffect(() => {
    let isActive = true;

    //extract dbId from navigation data
    const dbId = match.params.dbId;

    const getPosts = async () => {
      const response = await PostAPI.get(`/blogOverview/${dbId}`);
      setPosts(response.data);
    };

    if (isActive) {
      getPosts();
    }

    return () => (isActive = false);
  }, [match]);

  //REPEATED COMPONENTS
  const filtered_posts = posts.map((item, index) => {
    return (
      <Card key={index} style={styles.postCard} className="postCard">
        <Card.Img
          variant="top"
          src={`/pictures/blog/default/test${item.pictureIndex}.svg`}
        />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      <>
        <Divider horizontal>
          <Header as="h4">
            <Icon name="newspaper" />
            Posts
          </Header>
        </Divider>

        <Row className="mb-4">
          <Col></Col>
          <Col xs={12} sm={8}>
            {filtered_posts.reverse()}
          </Col>
          <Col></Col>
        </Row>
      </>
    </Container>
  );
}
