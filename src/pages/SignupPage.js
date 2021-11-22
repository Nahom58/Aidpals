import logo from "../Images/logo.svg";
import "../stylesheets/beza.css";
import { MyFirebase } from "../firebase";
import { Link } from "react-router-dom";
import useInput from "../useInput";
import { useHistory } from "react-router";
import { useAuth } from "../AuthContext";

const SignupPage = () => {
  const email = useInput("");
  const password = useInput("");
  const phoneNumber = useInput("");
  const username = useInput("");
  const birthdate = useInput("");
  const name = useInput("");

  const database = new MyFirebase();
  const history = useHistory();
  const { signup } = useAuth();

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      // if(database.getFirebase()){
      //  const user = await database.getFirebase().auth().createUserWithEmailAndPassword(email.value, password.value)

      await signup(email.value, password.value);

      database.createUser(
        database.getFirebase().auth().currentUser.uid,
        username.value,
        name.value,
        phoneNumber.value,
        email.value,
        "https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?b=1&k=6&m=1016744034&s=612x612&w=0&h=dbicqM9p31ex5Lm-FpsdOjHkPZM_6Lmkb02qJO9SY5E=",
        birthdate.value
      );

      history.push("/verify");
      //}
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />

      <form onSubmit={submitForm}>
        <div className="entry">
          <input
            type="text"
            placeholder="name"
            className="username"
            value={name.value}
            onChange={name.onChange}
          />
        </div>

        <div className="entry">
          <input
            type="text"
            placeholder="username"
            className="username"
            value={username.value}
            onChange={username.onChange}
          />
        </div>

        <div className="entry">
          <input
            type="password"
            placeholder="password"
            className="password"
            value={password.value}
            onChange={password.onChange}
          />
        </div>

        <div className="entry">
          <input
            type="text"
            placeholder="e-mail"
            className="email"
            value={email.value}
            onChange={email.onChange}
          />
        </div>

        <div className="entry">
          <input
            type="text"
            placeholder="phone number"
            className="phone-number"
            value={phoneNumber.value}
            onChange={phoneNumber.onChange}
          />
        </div>

        <div className="entry">
          <input
            type="text"
            placeholder="birthdate"
            className="birth-date"
            onChange={birthdate.onChange}
            value={birthdate.value}
          />
        </div>

        <div>
          <button className="button" type="submit">
            {" "}
            Sign Up{" "}
          </button>
        </div>
      </form>
    </>
  );
};

export default SignupPage;
