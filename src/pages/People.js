import React, { useState, useEffect } from "react";

//bootstrap
import { Container, Row, Col, Alert } from "react-bootstrap";

//components
import FriendCard from "../components/FriendCard";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//api
import UserAPI from "../requests/UserAPI";
import HouseAPI from "../requests/HouseAPI";

//use auth context
import { useAuth } from "../contexts/AuthContext";

export default function People() {
  //getting user data from context
  const { currentUser, currentUserData } = useAuth();

  //STATE
  const [users, setUsers] = useState(null);
  const [status, setStatus] = useState(null);

  //USE EFFECT
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

  //API REQUESTS
  const addHouseMate = async (dbId) => {
    setStatus("PENDING");
    try {
      const response = await HouseAPI.put(`/addUser/${dbId}`, {
        authId: currentUser.uid,
        dbId: currentUserData.dbId,
      });

      if (response.status === 200) {
        setStatus("SUCCESS");
      } else {
        throw new Error("Error in housemate addition");
      }
    } catch (err) {
      setStatus("FAIL");
    }
  };

  //REPEATED COMPONENTS
  var userCards;
  if (users) {
    userCards = users.map((item, index) => {
      return (
        <Row className="row-cols-1 mb-5">
          <Col>
            <FriendCard
              key={index}
              options="housemate"
              name={item.username}
              dbId={item.dbId}
              addHouseMate={addHouseMate}
            />
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

      {status === "SUCCESS" ? (
        <Alert variant="success">Housemate added</Alert>
      ) : status === "PENDING" ? (
        <Alert variant="warning">Adding housemate...</Alert>
      ) : status === "FAIL" ? (
        <Alert variant="danger">An error has ocurred</Alert>
      ) : null}

      {userCards}
    </Container>
  );
}
