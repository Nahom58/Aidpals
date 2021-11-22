import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import SettingsIcon from "@material-ui/icons/Settings";
import "../components/Nav-bottom.css";
import { Link } from "react-router-dom";

const NavBottom = (props) => {
  const user = props.user;

  return (
    <div className="Nav_bottom">
      <Link
        style={{ color: "#000c66" }}
        to={{ pathname: "/", state: { user: user } }}
      >
        <HomeIcon />
      </Link>
      <Link
        style={{ color: "#000c66" }}
        to={{ pathname: "/MyCirclesPage", state: { user: user } }}
      >
        <GroupIcon />
      </Link>
      <Link
        style={{ color: "#000c66" }}
        to={{ pathname: "/UserProfilePage", state: { user: user } }}
      >
        <SettingsIcon />
      </Link>
    </div>
  );
};

export default NavBottom;
