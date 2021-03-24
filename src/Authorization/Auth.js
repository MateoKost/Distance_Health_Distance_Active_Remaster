import React, { useEffect, useState,useCollectionData } from "react";
import { firestore,auth } from "../base.js";

// import { useCollectionData } from "react-firebase-hooks/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  // const [userFireData, setUserFireData] = useState(null);

  const usersRef = firestore.collection("users");


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  if (pending) {
    return <>Loading...</>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// export const signInWithGoogle = () => {
//   const provider = new auth.GoogleAuthProvider();
//   auth.signInWithPopup(provider);
// };

// export const signOut = () => {
//   auth.signOut();
// };



