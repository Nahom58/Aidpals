import logo from '../Images/logo.svg';
import '../stylesheets/beza.css';
import { Link } from 'react-router-dom';
import useInput from '../useInput';
import { useState } from 'react';
import { useLocation, useHistory } from "react-router";
import { useEffect } from 'react';
import { MyFirebase } from '../firebase';
import { useAuth } from '../AuthContext';

const SigninPage = () => {
  const email = useInput("");
  const password = useInput("");
  const [error,setError] = useState("")
  const {signin, currentUser} = useAuth();


   let firebase = new MyFirebase().getFirebase();
   const history = useHistory();
  // let firebase

  // useEffect ( () => {
  //     firebase = location.state.firebase;
  // }, [location.state])

  const handleSignIn = async(event) => {
    event.preventDefault();

    try{
      if(firebase){
        const user = await signin(email.value, password.value);

        history.push({ pathname: "/", 
        state: { user: currentUser.uid }}
        )
        

      }
    } catch (error){
        setError("there was a problem with logging in!")
    }
  }



  return ( 
      <>
    
    <img src={logo} className="App-logo" alt="logo"/>


    <form onSubmit={handleSignIn}>

        <div className="entry">
          <input type="text" placeholder= "username" className="username"  value={email.value} onChange={email.onChange}/>
        </div>

        <div className="entry2">
          <input type="password" placeholder="password" className="password"  value={password.value} onChange={password.onChange}/> 
        </div>

        <div className="loginstatus">
          {error}
        </div>

        <div className="account-creation">
          <p >Don't have an account?  <a href="/signUp"> Create an account!</a> </p>
          </div>

        <div>
           <button className="button" type= "submit"> Sign In </button> 
        </div>

        </form>
      </>
   );
}


export default SigninPage;
