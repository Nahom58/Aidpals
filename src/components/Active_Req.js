import { React, useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./Active_Req.css";
import { MyFirebase } from "../firebase";
import { useHistory } from "react-router";

const ActiveReq = (props) => {
  const requestID = props.requestID;
  const circle = props.circle;
  const [requestInfo, setRequestInfo] = useState([]);
  const [username, setUsername] = useState("");
  const history = useHistory();

  const setName = (userInfo) => {
    setUsername(userInfo.username);
  };

  useEffect(() => {
    let db = new MyFirebase();
    db.getRequestInfo(requestID, setRequestInfo);
  }, [requestID]);

  useEffect(() => {
    let db = new MyFirebase();
    // console.log(requestInfo);
    db.getUserInfo(requestInfo.user, setName);
  }, [requestInfo]);

  return (
    <div className="ActiveReq">
      <Avatar />
      {Object.keys(requestInfo).length > 0 && (
        <div className="ActiveReq__info">
          <h3>{username}</h3>
          <p>REQUESTED ${requestInfo.amount} </p>
          <div className="ActiveReq__fulfill">
            {requestInfo.approved ? (
              <p onClick={() => {}}>FULFILL REQUEST &#62; </p>
            ) : (
              <p
                onClick={() => {
                  history.push({
                    pathname: "/RequestDetails",
                    state: {
                      requestID: requestID,
                      circle: circle,
                      requestInfo: requestInfo,
                      username: username,
                    },
                  });
                }}
              >
                VIEW DETAILS &#62;{" "}
              </p>
            )}
          </div>
        </div>
      )}
    </div>

    // <div className="Request__Box">
    //     <Avatar />
    //     <div className="Requests">
    //         <h2>USERNAME</h2>
    //         <p>REQUESTED $40.00</p>
    //     </div>
    // </div>
  );
};

export default ActiveReq;
