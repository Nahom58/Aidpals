import { React, useState, useEffect } from "react";
import { Container, Col, Row, Image, Nav } from "react-bootstrap";
import AllTransactions from "../components/All_Transactions.js";
import NavBottom from "../components/Nav-bottom";
import { MyFirebase } from "../firebase.js";
import { useHistory, Link } from "react-router-dom";

const CircleHomePage2 = (props) => {
  const circleID = props.location.state.circleID;
  const user = props.location.state.user;
  const circle = props.location.state.circle;
  const [userTransactions, setUserTransactions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let db = new MyFirebase();
    db.getAllUserTransactions(user, setUserTransactions);
  }, [user]);

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
              {Object.keys(circle).length > 0 && (
                <strong>{Object.keys(circle.members).length} MEMBERS</strong>
              )}
            </p>

            <p className="Paragraph">{circle && circle.description}</p>
          </Col>
          <Col className="CHPbuttons">
            <button
              onClick={() => {
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
          <Nav activeKey="#second" className="justify-content-center">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to={{
                  pathname: "/CircleHomePage",
                  state: {
                    circleID: circleID,
                    circle: circle,
                    user: user,
                    needRefresh: false,
                  },
                }}
              >
                <strong>Active Requests</strong>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link style={{ color: "#000c66" }}>
                {Object.keys(circle).length > 0 &&
                Object.keys(circle.admins).includes(user) ? (
                  <strong>|&emsp;&emsp;&nbsp;&nbsp;All Transactions</strong>
                ) : (
                  <strong>|&emsp;&emsp;&nbsp;&nbsp;My Transactions</strong>
                )}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <div className="Lower_info">
            {circle !== null &&
              circle !== undefined &&
              Object.keys(circle).length > 0 &&
              circle.hasOwnProperty("transactions") &&
              userTransactions.length > 0 &&
              Object.keys(circle.transactions).map((transaction) => {
                let toReturn = [];
                if (userTransactions.includes(transaction)) {
                  toReturn.push(
                    <AllTransactions transactionID={transaction} user={user} />
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
};

export default CircleHomePage2;
