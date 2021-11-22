import "../App.css";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import CircleList from "../components/CircleList";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { MyFirebase } from "../firebase";
import CommitmentsDisplay from "../components/Commitments";
import "../stylesheets/maddie.css";
import NavBottom from "../components/Nav-bottom";
import { useLocation, useHistory, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

function HomePage(props) {
  const [circles, setCircles] = useState([]);
  const [name, setName] = useState("");
  const location = useLocation();
  const history = useHistory();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(currentUser.uid);

  function setCircleState(circleDictionary) {
    let tempArr = Object.values(circleDictionary);
    // console.log(tempArr);
    let circleNames = Object.keys(circleDictionary);
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].name = circleNames[i];
    }
    setCircles(tempArr);
  }

  const setUserName = (userInfo) => {
    setName(userInfo.name);
  };

  useEffect(() => {
    if (location.state) setUser(location.state.user);
  }, [location.state]);

  useEffect(() => {
    let db = new MyFirebase();
    db.getAllCircleInfo(setCircleState);
    db.getUserInfo(user, setUserName);
  }, [user]);

  return (
    <Container>
      <h1 className="homePageTitle">
        <b>
          Hi {name}, <br /> <span className="green">Find a new Circle</span>
        </b>
      </h1>
      <h3 className="homePageHeading">
        <b>My Circles</b>
      </h3>
      <CircleList circles={circles} user={user} type="myCirclesHome" />
      <CommitmentsDisplay circles={circles} user={user} />
      <SearchBox
        className="searchbar"
        placeholder="Search for circles..."
        onSearch={(newValue) => {
          history.push({
            pathname: "/search",
            state: { firstQuery: newValue, user: user },
          });
          // console.log("value is " + newValue);
        }}
      />
      <h3 className="homePageHeading trending">
        <b>Trending Circles</b>
      </h3>
      <CircleList circles={circles} user={user} type="trending" />
      <div className="createCirclePrompt">
        <p className="createCirclePromptText">
          <em>Can't find any circles that appeal to you?</em>
        </p>
        <Link
          to={{ pathname: "/createcircle", state: { user: user } }}
          style={{ textDecoration: "none" }}
        >
          <button className="createCircleButton">START YOUR OWN CIRCLE</button>
        </Link>
      </div>
      <NavBottom user={user} />
    </Container>
  );
}

export default HomePage;
