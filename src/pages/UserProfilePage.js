import "../stylesheets/Taonga.css";
import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col, Form } from "react-bootstrap";
import { MyFirebase } from "../firebase";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavBottom from "../components/Nav-bottom";
import { useHistory, Link } from "react-router-dom";

const UserProfilePage = (props) => {
  const user = props.location.state.user;
  const [userInfo, setUsrInfo] = useState("");
  const history = useHistory();

  useEffect(() => {
    let db = new MyFirebase();
    db.getUserInfo(user, setUsrInfo);
    // console.log(userInfo);
  }, []);

  return (
    <Container className="allProfileContent">
      <Row className="UserHeading">
        <Col id="head">User Profile</Col>
      </Row>
      <Row className="LowerContent">
        <Row>
          <Col>
            <Image
              className="DefaultPic"
              src={userInfo.profile_picture}
              xs={5}
              fluid
              roundedCircle
            />
          </Col>
        </Row>
        <Row className="InfoContainer">
          <Col xs={{ span: 5, offset: 1 }} className="Tag">
            Name
          </Col>
          {Object.keys(userInfo).length > 0 && (
            <Col xs={5} className="Info">
              {userInfo.name}
            </Col>
          )}
        </Row>
        <Row className="InfoContainer">
          <Col xs={{ span: 5, offset: 1 }} className="Tag">
            Date Of Birth
          </Col>
          {Object.keys(userInfo).length > 0 && (
            <Col xs={5} className="Info">
              {userInfo.birthday}
            </Col>
          )}
        </Row>
        <Row className="InfoContainer">
          <Col xs={{ span: 5, offset: 1 }} className="Tag">
            Phone Number
          </Col>
          {Object.keys(userInfo).length > 0 && (
            <Col xs={5} className="Info">
              {userInfo.phone}
            </Col>
          )}
        </Row>
        <Row className="InfoContainer">
          <Col xs={{ span: 5, offset: 1 }} className="Tag">
            Email
          </Col>
          {Object.keys(userInfo).length > 0 && (
            <Col xs={5} className="Info">
              {userInfo.email}
            </Col>
          )}
        </Row>
        <Row>
          <Col
            xs={{ span: 5, offset: 3 }}
            id="setup"
            onClick={() => {
              console.log(user);
              history.push({
                pathname: "/CardsInfoPage",
                state: { user: user, userInfo: userInfo },
              });
            }}
          >
            SETUP PAYMENTS{" "}
          </Col>
        </Row>
        <Row>
          <Col id="UpdateIcon" xs={{ span: 1, offset: 1 }}></Col>
          <Col
            xs={8}
            id="Update"
            onClick={() => {
              // console.log(user);
              history.push({
                pathname: "/UpdateUserProfilePage",
                state: { user: user, userInfo: userInfo },
              });
            }}
          >
            Update
          </Col>
        </Row>
        <Row>
          <NavBottom user={user} />
        </Row>
      </Row>
    </Container>
  );
};

export default UserProfilePage;
