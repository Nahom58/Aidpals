import "../stylesheets/enrique.css";
import { React, useRef } from "react";
import { Image, Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavBottom from "../components/Nav-bottom";
import { useHistory, Link } from "react-router-dom";
import { MyFirebase } from "../firebase";

function DonateMoneyPage(props) {
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
        <p>Enter the amount you want to donate.</p>

        <div>
          <Form className="textBox">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="number" placeholder="0000" ref={amount} />
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
              pathname: "/",
              state: {
                user: user,
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
                "Donation"
              );
              history.push({
                pathname: "/",
                state: {
                  user: user,
                },
              });
            }}
          >
            DONATE
          </p>
        </div>
      </div>
      <div className="navBar">
        <NavBottom user={user} />
      </div>
    </div>
  );
}

export default DonateMoneyPage;
