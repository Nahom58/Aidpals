import "../stylesheets/beza.css";
import { React, useState } from "react";
import { Image, Row, Col } from "react-bootstrap";
import useInput from "../useInput";
import { Switch } from "@material-ui/core";
import NavBottom from "../components/Nav-bottom";
import { MyFirebase } from "../firebase";
import IOSSwitch from "../components/IOSSwitch";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { useHistory } from "react-router";
import ActiveReq from "../components/Active_Req";

function AdminRequestsView(props) {
  const circle = props.location.state.circle;
  const circleID = props.location.state.circleID;
  const user = props.location.state.user;
  let db = new MyFirebase();
  const history = useHistory();

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
          <h1 className="unapprovedRequestsTitle">
            <b>Unapproved Requests</b>
          </h1>
        </Col>
      </div>

      <div className="AdminRequestLower">
        <span>&nbsp;</span>
        <div className="adminRequestContent">
          {circle !== null &&
            circle !== undefined &&
            Object.keys(circle).length > 0 &&
            circle.hasOwnProperty("requests") &&
            Object.keys(circle.requests).map((request) => {
              let toReturn = [];
              if (!circle.requests[request]) {
                toReturn.push(
                  <ActiveReq requestID={request} circle={circle} />
                );
              }
              return toReturn;
            })}
        </div>
        <div
          className="backButton"
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

export default AdminRequestsView;
