import { SearchBox } from "@fluentui/react/lib/SearchBox";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CircleList from "../components/CircleList";
import { MyFirebase } from "../firebase";
import NavBottom from "../components/Nav-bottom";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const [user, setUser] = useState("");
  const [circles, setCircles] = useState([]);
  const [search, setSearch] = useState("");

  function setCircleState(circleDictionary) {
    let tempArr = Object.values(circleDictionary);
    let circleNames = Object.keys(circleDictionary);
    for (let i = 0; i < tempArr.length; i++) {
      tempArr[i].name = circleNames[i];
    }
    setCircles(tempArr);
  }

  useEffect(() => {
    // console.log(location.state.firstQuery);
    setSearch(location.state.firstQuery);
    setUser(location.state.user);
  }, [location.state]);

  useEffect(() => {
    let db = new MyFirebase();
    db.getAllCircleInfo(setCircleState);
  }, []);

  return (
    <Container>
      <h1 className="myCirclesTitle">
        <b>Search</b>
      </h1>
      <SearchBox
        className="searchbar"
        placeholder="Search for circles..."
        onSearch={(newValue) => {
          setSearch(newValue);
        }}
      />
      <CircleList circles={circles} type="search" query={search} user={user} />
      <NavBottom user={user} />
    </Container>
  );
};

export default SearchPage;
