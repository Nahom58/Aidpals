import "../stylesheets/beza.css";
import { React, useState } from "react";
import { Image, Col } from "react-bootstrap";
import useInput from "../useInput";
import { MyFirebase } from "../firebase";
import IOSSwitch from "../components/IOSSwitch";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router";

function ManageCircle(props) {
  const circle = props.location.state.circle;
  const circleID = props.location.state.circleID;
  const user = props.location.state.user;
  const description = useInput(circle.description);
  const term = useInput(circle.term);
  const [public_private, setPublic] = useState(circle.public);
  const subscriptionFee = useInput(circle.subscription_fee);
  const profilePic = useInput(circle.profile_picture);
  let db = new MyFirebase();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    db.updateCircle(
      circleID,
      public_private,
      subscriptionFee.value,
      term.value,
      profilePic.value,
      description.value
    );
  }

  return (
    <div className="ManageCirclePage">
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

      <div className="LowerManage">
        <div className="openRequestsCardSection">
          <span>&nbsp;</span>
          <p
            onClick={() => {
              history.push({
                pathname: "/AdminRequestsView",
                state: { circleID: circleID, circle: circle, user: user },
              });
            }}
          >
            View Requests
          </p>
          {!circle.public && (
            <p
              onClick={() => {
                history.push({
                  pathname: "/AdminJoinRequestsView",
                  state: { circleID: circleID, circle: circle, user: user },
                });
              }}
            >
              View Join Requests
            </p>
          )}
        </div>
        <div className="updateCircleCard">
          <form className="circlecardsection" onSubmit={handleSubmit}>
            <div className="circleSetInfoItem publicSwitch">
              <label className="circlelabel"> Public </label>
              <IOSSwitch
                className="switch"
                checked={public_private}
                onChange={() => {
                  setPublic(!public_private);
                }}
              />
            </div>

            <div className="circleSetInfoItem">
              <label htmlFor="" className="circlelabel">
                {" "}
                Payment per term{" "}
              </label>
              <input
                className="payAmount"
                value={subscriptionFee.value}
                onChange={subscriptionFee.onChange}
                placeholder="$0.00"
              />
            </div>

            <div className="circleSetInfoItem">
              <label className="circlelabel">Term choice </label>
              <select
                id="term"
                name="term"
                className="termchoice"
                value={term.value}
                onChange={term.onChange}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="circlelabel">Enter a profile picture:</label>
              <div>
                <input
                  className="prof-pic-entry"
                  value={profilePic.value}
                  onChange={profilePic.onChange}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="circlelabel"> Enter a description: </label>
              <div>
                <textarea
                  className="circle-desc"
                  value={description.value}
                  onChange={description.onChange}
                  placeholder="A community for..."
                />
              </div>
            </div>

            <div>
              <button className="createbutton" type="submit">
                {" "}
                UPDATE CIRCLE
              </button>
            </div>
          </form>
        </div>
        <div
          className="backButton"
          onClick={() => {
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
          <ChevronLeftIcon
            className="manageBackIcon"
            style={{ display: "inline-block" }}
          />
          <p style={{ display: "inline-block", fontWeight: "900" }}>Back</p>
        </div>
      </div>
    </div>
  );
}

export default ManageCircle;
