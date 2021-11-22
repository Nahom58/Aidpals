import "../stylesheets/enrique.css";
import { React, useRef } from "react";
import { Image, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NavBottom from "../components/Nav-bottom";
// import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { MyFirebase } from "../firebase";
import { Link, useHistory } from "react-router-dom";

function RequestPage(props) {
  const circle = props.location.state.circleInfo;
  const circleID = props.location.state.circleID;
  const user = props.location.state.user;
  let amount = useRef("");
  let publicDescription = useRef("");
  let adminDescription = useRef("");
  const history = useHistory();

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
        <p>Enter the amount you want to request.</p>

        <div className="cashThingie">
          {/* <AttachMoneyIcon /> */}
          <Form className="textBox">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="number" placeholder="0000" ref={amount} />
            </Form.Group>
          </Form>
        </div>

        <div className="secondSentence">
          <p>Describe what you would be comfortable sharing with the circle:</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={2} ref={publicDescription} />
          </Form.Group>
          <p>Describe your situation &#40;only shared with admins&#41;:</p>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} ref={adminDescription} />
          </Form.Group>
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
              db.createCircleRequest(
                user,
                circleID,
                amount.current.value,
                publicDescription.current.value,
                adminDescription.current.value
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
            PLACE REQEST
          </p>
        </div>
      </div>
      <div className="navBar">
        <NavBottom user={user} />
      </div>
    </div>
  );
}

export default RequestPage;
