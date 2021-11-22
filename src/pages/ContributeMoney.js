import "../stylesheets/enrique.css";
import { React, useRef } from "react";
import { Image, Row, Col } from "react-bootstrap";
// import DefaultProfile from "./DefaultProfile.png";
import { Form } from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavBottom from "../components/Nav-bottom";
import { useHistory, Link } from "react-router-dom";
import { MyFirebase } from "../firebase";

function ContributeMoney(props) {
  const history = useHistory();
  const circleID = props.location.state.circleID;
  const circle = props.location.state.circle;
  const user = props.location.state.user;
  let amount = useRef(null);

  return (
    <div className="Page">
      <div className="UpperManage">
        {" "}
        <Col xs={12} md={12}>
          <Image
            src={circle && circle.profile_picture}
            width={100}
            height={100}
            roundedCircle
          />
          <br />
          <p>
            <strong>{circleID}</strong>
          </p>
        </Col>
      </div>

      <div className="contribute-card">
        {circleID.length > 0 && (
          <p>Enter the amount you want to contribute to {circleID}.</p>
        )}
        <div>
          <Form className="textBox">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                className="money-amt-input"
                type="number"
                placeholder="0000"
                ref={amount}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="secondSentence">
          <p>Do you want to make this a recurring payment?</p>
        </div>
        <div className="Forms">
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="Never"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
                <Form.Check
                  type="radio"
                  label="Every Week"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
                <Form.Check
                  type="radio"
                  label="Every Month"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                />
                <Form.Check
                  type="radio"
                  label="Every Year"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios4"
                />
              </Col>
            </Form.Group>
          </fieldset>
        </div>
        <div className="FlexPayment">
          <Link
            style={{ color: "#000c66" }}
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
            <ChevronLeftIcon></ChevronLeftIcon>
          </Link>
          <p
            id="setup2"
            onClick={() => {
              let db = new MyFirebase();
              db.createTransaction(
                circleID,
                user,
                amount.current.value,
                "Contribution"
              );
              history.push({
                pathname: "/CircleHomePage",
                state: {
                  circleID: circleID,
                  circle: circle,
                  user: user,
                  needRefresh: true,
                },
              });
            }}
          >
            CONTRIBUTE
          </p>
        </div>
      </div>
      <div className="navBar">
        <NavBottom user={user} />
      </div>
    </div>
  );
}

export default ContributeMoney;
