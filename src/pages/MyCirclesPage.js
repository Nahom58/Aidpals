import React, { useState, useEffect } from "react";
import "../App.css";
import "../stylesheets/maddie.css";
import CircleList from "../components/CircleList";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { MyFirebase } from "../firebase";
import NavBottom from "../components/Nav-bottom";
import { useLocation, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

function MyCirclesPage(props) {
  const location = useLocation();
  const [user, setUser] = useState("");
  const [circles, setCircles] = useState([]);
  const history = useHistory();

  // turns circle dictionary into an array of objects, including name
  function setCircleState(circleDictionary) {
    let tempArr = Object.values(circleDictionary);
    let circleNames = Object.keys(circleDictionary);
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].name = circleNames[i];
    }
    setCircles(tempArr);
  }
  // for now, gets all circles, not those specific to a user
  useEffect(() => {
    let db = new MyFirebase();
    db.getAllCircleInfo(setCircleState);
  }, []); // empty dependency array, will only run once

  useEffect(() => {
    setUser(location.state.user);
  }, [location.state]);

  return (
    <Container className="myCirclesPage">
      <h1 className="myCirclesTitle">
        <b>My Circles</b>
      </h1>
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
      <CircleList circles={circles} type="myCircles" user={user} />
      <NavBottom user={user} />
    </Container>
  );
}

export default MyCirclesPage;
