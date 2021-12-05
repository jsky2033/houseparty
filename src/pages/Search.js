import React, { useState, useEffect } from "react";

//router dom components
import { Link } from "react-router-dom";

//bootstrap
import {
  Container,
  Form,
  Image,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

//Semanitc UI
import { Divider, Header, Icon } from "semantic-ui-react";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStar,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";

//Google maps api
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

//requests
import HouseAPI from "../requests/HouseAPI";

//use auth context
import { useAuth } from "../contexts/AuthContext";

//GOOGLE MAPS SETTINGS

// get google API key
const googleAPI = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
// set libraries
const libraries = ["places"];
//set map style
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
// map settings
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Search({ match }) {
  //getting user data from context
  const { currentUser } = useAuth();

  //STATE
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [newCenter, setNewCenter] = useState({
    lat: 29.651634,
    lng: -82.324829,
  });

  // USE EFFECT

  useEffect(() => {
    let isActive = true;

    const getData = async () => {
      const response = await HouseAPI.get(`/${currentUser.uid}`);
      if (response.data) {
        setNewCenter({
          lat: response.data.geoCode.lat,
          lng: response.data.geoCode.lng,
        });
        setSelected(response.data);
      }
      const locations = await HouseAPI.get("/geoCode/getAll");
      if (locations.data) {
        setMarkers(locations.data);
      }
    };

    if (isActive) {
      getData();
    }

    return (isActive = false);
  }, [match, currentUser]);

  // MAP LOADER
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleAPI,
    libraries: libraries,
  });

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
    btn: {
      width: "100%",
    },
    faIcon: {
      marginRight: "1em",
    },
  };

  //  MAP ERROR/LOADING HANDLING

  if (loadError) return "Error Loading Maps";
  if (!isLoaded) return "Loading Maps";

  // EVENT HANDLERS

  const selectHouse = async (geoCode) => {
    try {
      const response = await HouseAPI.get(`/geoCode/getByLoc`, {
        params: { lat: geoCode.lat, lng: geoCode.lng },
      });
      if (response.status === 200) {
        setSelected(response.data.house);
      } else {
        throw new Error("House Data for Location Not Found");
      }
    } catch (err) {
      console.log(err);
    }
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
        <Col xs={12} sm={selected ? 8 : 12}>
          <Card className="p-2">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={newCenter}
              options={options}
            >
              {markers.map(({ geoCode }) => {
                if (
                  geoCode.lat === newCenter.lat &&
                  geoCode.lng === newCenter.lng
                ) {
                  return (
                    <Marker
                      key={geoCode._id}
                      position={{ lat: geoCode.lat, lng: geoCode.lng }}
                      icon={{
                        url: "/pictures/house/default/homeIcon.svg",
                        scaledSize: new window.google.maps.Size(70, 70),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      onClick={() => {
                        selectHouse(geoCode);
                      }}
                    />
                  );
                } else {
                  return (
                    <Marker
                      key={geoCode._id}
                      position={{ lat: geoCode.lat, lng: geoCode.lng }}
                      icon={{
                        url: "/pictures/house/default/houseIcon3.svg",
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      onClick={() => {
                        selectHouse(geoCode);
                      }}
                    />
                  );
                }
              })}
            </GoogleMap>
          </Card>
        </Col>
        {selected ? (
          <Col className="mt-3 mt-sm-0" sm={selected ? 4 : 12}>
            <Card style={styles.selectedHouse} className=" p-4">
              <Row>
                <Col xs={12}>
                  <h3>Selected House</h3>
                  <Image
                    fluid
                    thumbnail
                    src="/pictures/profile/testImages/test1.jpg"
                  ></Image>
                </Col>
                <Col xs={12} className="mt-3">
                  <h2>Description</h2>
                  <p className="lead">{selected.description}</p>
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    <FontAwesomeIcon icon={faUsers} style={styles.faIcon} />
                    Residents
                  </Form.Label>
                  <h4 className="mt-0">
                    {selected.housemates ? selected.housemates.length : null}
                  </h4>
                  <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                    <FontAwesomeIcon icon={faStar} style={styles.faIcon} />
                    Rating
                  </Form.Label>
                  <h4 className="mt-0">4.3</h4>
                  <Link
                    to={{ pathname: `/userhouse/${selected.dbId}` }}
                    style={styles.button}
                  >
                    <Button style={styles.btn} className="btn-lg">
                      <FontAwesomeIcon
                        icon={faHouseUser}
                        style={styles.faIcon}
                      />
                      See Profile
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          </Col>
        ) : null}
      </Row>
    </Container>
  );
}
