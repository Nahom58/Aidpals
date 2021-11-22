import { React, useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Active_Req.css";
import { MyFirebase } from "../firebase";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router";
import { useAuth } from "../AuthContext";

const JoinRequest = (props) => {
  const requestUser = props.requestUser;
  console.log(requestUser);
  const circle = props.circle;
  const circleID = props.circleID;
  const [username, setUsername] = useState("");
  let db = new MyFirebase();
  const history = useHistory();
  const { currentUser } = useAuth();

  const setName = (userInfo) => {
    console.log(userInfo);
    setUsername(userInfo.username);
  };

  useEffect(() => {
    let db = new MyFirebase();
    // console.log(requestInfo);
    db.getUserInfo(requestUser, setName);
  }, [requestUser]);

  return (
    <div className="ActiveReq joinReq">
      <Avatar />
      <div className="ActiveReq__info">
        <h3>{username}</h3>
        <p>REQUESTED TO JOIN</p>
      </div>
      <div className="joinRequestIcons">
        <CheckIcon
          className="joinCheckIcon"
          onClick={() => {
            db.approveJoinRequest(circleID, requestUser);
            history.push({
              pathname: "/CircleHomePage",
              state: {
                circleID: circleID,
                circle: circle,
                user: currentUser.uid,
                needRefresh: true,
              },
            });
          }}
        />
        <CloseIcon
          className="joinCloseIcon"
          onClick={() => {
            db.denyJoinRequest(circleID, requestUser);
            history.push({
              pathname: "/CircleHomePage",
              state: {
                circleID: circleID,
                circle: circle,
                user: currentUser.uid,
                needRefresh: true,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default JoinRequest;
