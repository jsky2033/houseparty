import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPen,
  faDollarSign,
  faSwimmingPool,
  faDumbbell,
  faSink,
  faTree,
  faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons";

export default function HouseForm({ editHouse, houseStatus, userHouse, type }) {
  //styles
  const styles = {
    avatar: {
      width: "10em",
    },
    card: {
      padding: "3em",
    },
    faIcon: {
      marginRight: ".5em",
    },
    btn: {
      width: "100%",
      marginTop: "1em",
    },
  };

  //STATE
  const [houseData, setHouseData] = useState({
    ...userHouse,
  });
  const [houseInfo, setHouseInfo] = useState(
    userHouse
      ? {
          ...userHouse["information"],
        }
      : {}
  );

  //event handlers
  const houseDataUpdate = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setHouseData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const houseInfoUpdate = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setHouseInfo((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editHouse(houseData, houseInfo);
  };

  return (
    <div style={styles.card}>
      {houseStatus === "SUCCESS" ? (
        <Alert variant="success">House Description Changed</Alert>
      ) : houseStatus === "PENDING" ? (
        <Alert variant="warning">Changing Description...</Alert>
      ) : houseStatus === "FAIL" ? (
        <Alert variant="danger">An error has ocurred</Alert>
      ) : houseStatus === "LOGIN_AGAIN" ? (
        <Alert variant="danger">Please login again to change settings</Alert>
      ) : houseStatus === "FAIL_ADDRESS" ? (
        <Alert variant="danger">Could not validate this address</Alert>
      ) : null}
      <Row>
        <Col xs={12}>
          {type === "description" ? (
            <>
              <h1 className="text-center">Edit House Description</h1>
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Address
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                name="address"
                value={houseData ? houseData.address : null}
                onChange={houseDataUpdate}
              />
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.faIcon} />
                Zip Code
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  name="zipCode"
                  value={houseData ? houseData.zipCode : null}
                  onChange={houseDataUpdate}
                />
              </InputGroup>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faDollarSign} style={styles.faIcon} />
                Rent Description
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  name="rent"
                  value={houseData ? houseData.rent : null}
                  onChange={houseDataUpdate}
                />
              </InputGroup>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faPen} style={styles.faIcon} />
                Description
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  name="description"
                  value={houseData ? houseData.description : null}
                  onChange={houseDataUpdate}
                  as="textarea"
                />
              </InputGroup>
            </>
          ) : type === "information" ? (
            <>
              <h1 className="text-center">Edit House Information</h1>
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faSwimmingPool} style={styles.faIcon} />
                Pool
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                name="poolDesc"
                value={houseInfo ? houseInfo.poolDesc : null}
                onChange={houseInfoUpdate}
                as="textarea"
              />

              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faDumbbell} style={styles.faIcon} />
                Gym
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                name="gymDesc"
                value={houseInfo ? houseInfo.gymDesc : null}
                onChange={houseInfoUpdate}
                as="textarea"
              />
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                <FontAwesomeIcon icon={faSink} style={styles.faIcon} />
                Kitchen
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                value={houseInfo ? houseInfo.kitchenDesc : null}
                name="kitchenDesc"
                onChange={houseInfoUpdate}
                as="textarea"
              />

              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faShoppingBasket} style={styles.faIcon} />
                Washer/Dryer
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  name="laundryDesc"
                  value={houseInfo ? houseInfo.laundryDesc : null}
                  onChange={houseInfoUpdate}
                  as="textarea"
                />
              </InputGroup>
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                <FontAwesomeIcon icon={faTree} style={styles.faIcon} />
                Garden/Yard
              </Form.Label>
              <InputGroup className="mb-2">
                <FormControl
                  id="inlineFormInputGroup"
                  name="gardenDesc"
                  value={houseInfo ? houseInfo.gardenDesc : null}
                  onChange={houseInfoUpdate}
                  as="textarea"
                />
              </InputGroup>
            </>
          ) : null}
          <Button style={styles.btn} size="lg" onClick={onSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  );
}
