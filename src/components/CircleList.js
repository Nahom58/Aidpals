import { Avatar } from "@material-ui/core";
import "./CircleList.css";
// import { useState } from "react";
import "../components/TrendingCircle.css";
import { Stack } from "@fluentui/react";
import { MyFirebase } from "../firebase";
import { useHistory } from "react-router-dom";

const CircleList = (props) => {
  const circles = props.circles;
  const query = props.query;
  const user = props.user;
  const type = props.type;
  const history = useHistory();
  var myCircleCount = 0;
  var trendingCircleCount = 0;

  // randomly shuffle circles (would require restructuring)
  // allwos change for which circles are "trending"
  // useEffect(() => {
  //   if (circles.length > 4) {
  //     circles = circles.sort(() => 0.5 - Math.random());
  //   }
  // }, [circles]);

  return (
    <Stack horizontal wrap={true} className="circleStack">
      {circles.map((circle) => {
        const toReturn = [];
        // console.log(circle.members);

        if (Object.keys(circle.members).includes(user)) {
          if (
            type === "myCircles" ||
            (type === "myCirclesHome" && myCircleCount < 2) ||
            (type === "search" &&
              circle.name.toLowerCase().includes(query.toLowerCase()))
          ) {
            myCircleCount++;
            toReturn.push(
              <Stack.Item className="circleItem" key={circle.name}>
                <Avatar src={circle.profile_picture} />
                <div className="circleInfo">
                  <h3>{circle.name}</h3>
                  <button
                    onClick={() => {
                      history.push({
                        pathname: "/CircleHomePage",
                        state: {
                          circleID: circle.name,
                          circle: circle,
                          user: user,
                          needRefresh: false,
                        },
                      });
                    }}
                  >
                    OPEN CIRCLE
                  </button>
                </div>
              </Stack.Item>
            );
          } else {
            console.log("not wanted");
          }
        } else if (
          (type === "search" &&
            circle.name.toLowerCase().includes(query.toLowerCase())) ||
          (type === "trending" && trendingCircleCount < 2)
        ) {
          if (circle.public) {
            trendingCircleCount++;
            toReturn.push(
              <Stack.Item
                className="CircleList_trendingCircleItem"
                key={circle.name}
              >
                <h3>{circle.name}</h3>
                <div className="CircleList_trendingCircleBottom">
                  <Avatar
                    src={circle.profile_picture}
                    style={{ width: "30px", height: "30px", marginTop: "2px" }}
                  />
                  <div className="CircleList_trendingCircleInfo">
                    <p>Amount - ${circle.subscription_fee}</p>
                    <p>Term - {circle.term}</p>
                    <p className="lastInfoTrending">
                      Members - {Object.keys(circle.members).length}
                    </p>
                    <div className="CircleList_trendingCircleBttns">
                      <button
                        onClick={() => {
                          let db = new MyFirebase();
                          db.joinCircle(circle.name, user);
                          history.push({
                            pathname: "/CircleHomePage",
                            state: {
                              circleID: circle.name,
                              circle: circle,
                              user: user,
                              needRefresh: false,
                            },
                          });
                        }}
                      >
                        JOIN
                      </button>
                      &nbsp;
                      <button
                        onClick={() => {
                          history.push({
                            pathname: "/DonateMoneyPage",
                            state: {
                              circleID: circle.name,
                              circle: circle,
                              user: user,
                            },
                          });
                        }}
                      >
                        DONATE
                      </button>
                    </div>
                  </div>
                </div>
              </Stack.Item>
            );
          } else if (
            type !== "trending" &&
            circle.hasOwnProperty("join_requests") &&
            Object.keys(circle.join_requests).includes(user)
          ) {
            toReturn.push(
              <Stack.Item
                className="CircleList_trendingCircleItem"
                key={circle.name}
              >
                <h3>{circle.name}</h3>
                <div className="CircleList_trendingCircleBottom">
                  <Avatar
                    src={circle.profile_picture}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginTop: "2px",
                    }}
                  />
                  <div className="CircleList_trendingCircleInfo">
                    <p>Amount - ${circle.subscription_fee}</p>
                    <p>Term - {circle.term}</p>
                    <p className="lastInfoTrending">
                      Members - {Object.keys(circle.members).length}
                    </p>
                    <div className="CircleList_trendingCircleBttns">
                      <button className="CircleList_requestedBttn">
                        REQUESTED
                      </button>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </Stack.Item>
            );
          } else if (type !== "trending") {
            toReturn.push(
              <Stack.Item
                className="CircleList_trendingCircleItem"
                key={circle.name}
              >
                <h3>{circle.name}</h3>
                <div className="CircleList_trendingCircleBottom">
                  <Avatar
                    src={circle.profile_picture}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginTop: "2px",
                    }}
                  />
                  <div className="CircleList_trendingCircleInfo">
                    <p>Amount - ${circle.subscription_fee}</p>
                    <p>Term - {circle.term}</p>
                    <p className="lastInfoTrending">
                      Members - {Object.keys(circle.members).length}
                    </p>
                    <div className="CircleList_trendingCircleBttns">
                      <button
                        onClick={() => {
                          let db = new MyFirebase();
                          db.requestToJoinCircle(circle.name, user);
                        }}
                      >
                        REQUEST
                      </button>
                      &nbsp;
                    </div>
                  </div>
                </div>
              </Stack.Item>
            );
          }
        }

        return toReturn;
      })}
    </Stack>
  );
};

export default CircleList;
