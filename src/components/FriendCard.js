import React from "react";

//router dom components
import { Link } from "react-router-dom";

//bootstrap
import { Card, Row, Col, Image, Button } from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAltSlash,
  faComment,
  faCogs,
  faUserPlus,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

//default data
const default_user = {
  name: "Nivek",
  email: "123@gmail.com",
  description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
};

export default function FriendCard({
  name,
  description,
  options,
  addHouseMate,
  dbId,
  deleteHouseMate,
  phone,
}) {
  //css
  let styles = {
    avatar: {
      width: "10em",
    },
    avatarCont: {
      display: "flex",
      justifyContent: "center",
    },
    card: {
      padding: "1em",
    },
    button: {
      width: "100%",
    },
    HMC: {
      display: "flex",
      justifyContent: "right",
      paddingRight: "2em",
    },
    faIcon: {
      marginRight: "1em",
    },
  };

  const act_name = name ? name : default_user.name;
  const act_phone = phone ? phone : default_user.phone;
  const act_description = description ? description : default_user.description;

  let sizePic = 2;
  let sizeText = 5;
  if (options === "housemate-view") {
    sizePic = 12;
    sizeText = 12;
    styles.avatarCont.marginBottom = "2em";
  }
  return (
    <Card style={styles.card}>
      <Row className="align-items-center">
        <Col xs={12} md={sizePic}>
          <div style={styles.avatarCont}>
            <Image
              src="/pictures/profile/default/m_avatar.svg"
              fluid
              roundedCircle
              style={styles.avatar}
            ></Image>
          </div>
        </Col>
        <Col xs={12} md={sizeText}>
          <h2>{act_name}</h2>
          {options === "owner-view" ? (
            <p>
              <strong>Phone: </strong> {act_phone}
            </p>
          ) : null}
          <p>{act_description}</p>
        </Col>
        {options === "friends" ? (
          <Col xs={12} sm={5} className="mt-3 mt-sm-0">
            <Row className="mb-3" style={styles.HMC}>
              <Button style={styles.button} className="btn-lg">
                <FontAwesomeIcon icon={faComment} style={styles.faIcon} />
                Message
              </Button>
            </Row>
            <Row style={styles.HMC}>
              <Button
                style={styles.button}
                className="btn-lg"
                onClick={() => {
                  deleteHouseMate(dbId);
                }}
              >
                <FontAwesomeIcon icon={faUserAltSlash} style={styles.faIcon} />
                Remove Housemate
              </Button>
            </Row>
          </Col>
        ) : options === "owner" ? (
          <Col xs={12} sm={5} className="mt-3 mt-sm-0">
            <Row className="mb-3" style={styles.HMC}>
              <Button
                style={styles.button}
                className="btn-lg"
                onClick={() => {
                  window.location = "/profile";
                }}
              >
                <FontAwesomeIcon icon={faCogs} style={styles.faIcon} />
                Edit Profile
              </Button>
            </Row>
          </Col>
        ) : options === "housemate" ? (
          <Col xs={12} sm={5} className="mt-3 mt-sm-0">
            <Row className="mb-3" style={styles.HMC}>
              <Link
                to={{ pathname: `/userhouse/${dbId}` }}
                style={styles.button}
              >
                <Button style={styles.button} className="btn-lg">
                  <FontAwesomeIcon icon={faHouseUser} style={styles.faIcon} />
                  See Profile
                </Button>
              </Link>
            </Row>
            <Row className="mb-3" style={styles.HMC}>
              <Button
                style={styles.button}
                className="btn-lg"
                onClick={() => {
                  addHouseMate(dbId);
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} style={styles.faIcon} />
                Add Housemate
              </Button>
            </Row>
          </Col>
        ) : null}
      </Row>
    </Card>
  );
}
