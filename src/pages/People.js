import React, { useState, useEffect } from "react";

//bootstrap
import { Container, Row, Col } from "react-bootstrap";

//components
import FriendCard from "../components/FriendCard";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//api
import UserAPI from "../requests/UserAPI";

export default function People() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    let isActive = true;

    const getUsers = async () => {
      const response = await UserAPI.get("/userOps/getAll");
      setUsers(response.data);
    };

    if (isActive) {
      getUsers();
    }

    return (isActive = false);
  }, []);

  var userCards;
  if (users) {
    userCards = users.map((item, index) => {
      return (
        <Row className="row-cols-1 mb-5">
          <Col>
            <FriendCard key={index} options="housemate" name={item.username} />
          </Col>
        </Row>
      );
    });
  }
  return (
    <Container>
      <Divider horizontal>
        <Header as="h4">
          <Icon name="users" />
          People
        </Header>
      </Divider>
      {userCards}
    </Container>
  );
}
