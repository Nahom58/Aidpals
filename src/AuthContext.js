import { useContext } from "react";
import { MyFirebase } from "./firebase";
import { useState, useEffect } from "react";
import React from "react";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}


const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true)

    const auth = new MyFirebase().getFirebase().auth();

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    
    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)
        })
    
        return unsubscribe
      }, [])
    
      const value = {
          signup,
          signin,
          logout,
          currentUser,
          
      }
    
      return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
    }

    export default AuthProvider;

