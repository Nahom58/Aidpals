import logo from "../Images/logo.svg";
import "../stylesheets/beza.css";
import { Link } from "react-router-dom"; 
import { useLocation, useHistory } from "react-router";

const VerifyPage = () => {

  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push("/signin")
  }

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="verify-label"> ENTER YOUR VERIFICATION CODE </p>

        <div className="entry">
          <input type="text" placeholder="verification code" className="verification-code"/>
        </div>


      <div>
        <button className="button" onClick={handleClick}> verify   </button> 
      </div>
    </>
  );
};

export default VerifyPage;
