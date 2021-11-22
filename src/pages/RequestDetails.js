import { useHistory } from "react-router";
import { Form, Col, Image } from "react-bootstrap";
import { MyFirebase } from "../firebase";
import { useAuth } from "../AuthContext";

const RequestDetails = (props) => {
  const requestID = props.location.state.requestID;
  const username = props.location.state.username;
  const requestInfo = props.location.state.requestInfo;
  const { currentUser } = useAuth();
  const UID = currentUser.uid;
  const circle = props.location.state.circle;
  let db = new MyFirebase();
  const history = useHistory();
  console.log(UID);

  return (
    <div className="requestDetails">
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
            <strong>{requestInfo.circle}</strong>
          </p>
        </Col>
      </div>
      <div className="LowerRequestDetails">
        <span>&emsp;</span>
        <p className="requestDetailsTitle">@{username} requested</p>
        <div className="cashThingie">
          {/* <AttachMoneyIcon /> */}
          <Form className="amountDisplay">
            <Form.Group
              className="mb-3 requestDetailsAmt"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                placeholder="0000"
                value={"$" + requestInfo.amount}
              />
            </Form.Group>
          </Form>
        </div>
        <div className="secondSentence updateWidthRequest">
          <p>Public Description:</p>
          <Form.Group
            className="mb-3 requestDetails"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              as="textarea"
              rows={2}
              value={requestInfo.public_description}
            />
          </Form.Group>
          <p>Full Description:</p>
          <Form.Group
            className="mb-3 requestDetails"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control
              as="textarea"
              rows={3}
              value={requestInfo.full_description}
            />
          </Form.Group>
        </div>
        <div className="requestDetailsButtons">
          <button
            className="approveButton"
            onClick={() => {
              db.approveRequest(requestInfo.circle, requestID);
              history.push({
                pathname: "/CircleHomePage",
                state: {
                  circleID: requestInfo.circle,
                  circle: circle,
                  user: UID,
                  needRefresh: true,
                },
              });
            }}
          >
            Approve
          </button>
          <br />
          <button
            className="denyButton"
            onClick={() => {
              db.denyRequest(requestInfo.circle, requestID);
              history.push({
                pathname: "/CircleHomePage",
                state: {
                  circleID: requestInfo.circle,
                  circle: circle,
                  user: UID,
                  needRefresh: true,
                },
              });
            }}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
