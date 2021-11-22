import { React, useState, useEffect } from "react";
import "../stylesheets/nahom.css";
import { MyFirebase } from "../firebase";
import { Container, Col, Row, Image, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ActiveReq from "../components/Active_Req.js";
import NavBottom from "../components/Nav-bottom";

function CircleHomePage(props) {
  console.log(props);
  const circleID = props.location.state.circleID;
  const [circle, setCircleInfo] = useState(props.location.state.circle);
  const user = props.location.state.user;
  const needRefresh = props.location.state.needRefresh;

  // console.log(circleID);
  // console.log(user);
  // console.log(circle);
  // console.log(Object.keys(circle.members).length);
  const history = useHistory();

  useEffect(() => {
    if (needRefresh) {
      // console.log("here");
      let db = new MyFirebase();
      db.getCircleInfo(circleID, setCircleInfo);
    }
  }, [circleID, needRefresh]);

  return (
    <div>
      <Container>
        <Row className="Upper">
          <Col xs={12} md={12}>
            <h2>
              <strong>{circleID}</strong>
            </h2>
          </Col>
          <Col xs={12} md={12}>
            <Image
              src={circle.profile_picture}
              width={100}
              height={100}
              roundedCircle
            />
            <br />
            <p>
              {circle && Object.keys(circle).length > 0 && (
                <strong>{Object.keys(circle.members).length} MEMBERS</strong>
              )}
            </p>

            <p className="Paragraph">{circle && circle.description}</p>
          </Col>

          <Col className="CHPbuttons">
            <button
              onClick={() => {
                // console.log(user);
                history.push({
                  pathname: "/ContributeMoney",
                  state: { circleID: circleID, circle: circle, user: user },
                });
              }}
            >
              CONTRIBUTE
            </button>{" "}
            &nbsp;&nbsp;
            {Object.keys(circle).length > 0 &&
            Object.keys(circle.admins).includes(user) ? (
              <button
                variant="success"
                onClick={() => {
                  history.push({
                    pathname: "/ManageCircle",
                    state: {
                      circleID: circleID,
                      circle: circle,
                      user: user,
                    },
                  });
                }}
              >
                MANAGE
              </button>
            ) : (
              <button
                variant="success"
                onClick={() => {
                  history.push({
                    pathname: "/RequestPage",
                    state: {
                      circleID: circleID,
                      circleInfo: circle,
                      user: user,
                    },
                  });
                }}
              >
                REQUEST
              </button>
            )}
          </Col>
          <br />
          <br />
          <br />
        </Row>

        <Row className="Lower">
          <Nav activeKey="#first" className="justify-content-center">
            <Nav.Item>
              <Nav.Link>
                <strong style={{ color: "#000c66" }}>
                  Active Requests&nbsp;&nbsp;&emsp;&emsp;|
                </strong>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={{
                  pathname: "/CircleHomePage2",
                  state: {
                    circleID: circleID,
                    circle: circle,
                    user: user,
                    needRefresh: false,
                  },
                }}
              >
                {Object.keys(circle).length > 0 &&
                Object.keys(circle.admins).includes(user) ? (
                  <strong>All Transactions</strong>
                ) : (
                  <strong>My Transactions</strong>
                )}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="Lower_info">
            {circle !== null &&
              circle !== undefined &&
              Object.keys(circle).length > 0 &&
              circle.hasOwnProperty("requests") &&
              Object.keys(circle.requests).map((request) => {
                let toReturn = [];
                if (circle.requests[request]) {
                  toReturn.push(
                    <ActiveReq requestID={request} circle={circle} />
                  );
                }
                return toReturn;
              })}
          </div>
        </Row>
        <Row>
          <NavBottom user={user} />
        </Row>
      </Container>
    </div>
  );
}

export default CircleHomePage;
