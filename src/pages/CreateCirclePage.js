import useInput from "../useInput";
import { MyFirebase } from "../firebase";
import "../stylesheets/beza.css";
import { React, useState } from "react";
import NavBottom from "../components/Nav-bottom";
import "../components/Nav-bottom.css";
// import { Switch } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useAuth } from "../AuthContext";
import IOSSwitch from "../components/IOSSwitch";

function CreateCirclePage() {
  const name = useInput("");
  const [public_private, setPublic] = useState(true);
  const description = useInput("");
  const term = useInput("weekly");
  const subscriptionFee = useInput("");
  const profilePic = useInput("");
  const { currentUser } = useAuth();
  const history = useHistory();

  const database = new MyFirebase();

  function handleSubmit(e) {
    e.preventDefault();
    database.createCircle(
      name.value,
      public_private,
      description.value,
      profilePic.value,
      term.value,
      subscriptionFee.value,
      currentUser.uid
    );

    history.push({
      pathname: "/",
      state: {
        user: currentUser.uid,
      },
    });
  }

  return (
    <div className="page">
      <div className="purple-background-top">
        <h1 className="title">Create Circle</h1>
      </div>

      <div item className="circle-white-card">
        <form className="circlecardsection" onSubmit={handleSubmit}>
          <input
            className="circleName"
            value={name.value}
            onChange={name.onChange}
            placeholder="Circle Name"
          />

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
              CREATE CIRCLE
            </button>
          </div>
        </form>
      </div>

      <div className="navbar">
        <NavBottom user={currentUser.uid} />
      </div>
    </div>
  );
}
export default CreateCirclePage;
