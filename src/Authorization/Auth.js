import React, { useEffect, useState,useCollectionData } from "react";
import { firestore,auth } from "../base.js";
import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css"


// import { useCollectionData } from "react-firebase-hooks/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState({admin: false, coach:false, student:false});
  const [rolePending, setRolePending] = useState(true);


  const [pending, setPending] = useState(true);
  // const [userFireData, setUserFireData] = useState(null);

  const usersRef = firestore.collection("users");

  // const getTimestamp = () => {
  //   firestore.FieldValue.serverTimestamp()
  // }

  function allowCoach(){
    return !rolePending && currentRole.coach;
  }

  function allowStudent(){
    console.log(currentRole.student)
    return !rolePending && currentRole.student;
  }

  useEffect(() => {

    async function getRole(id) {
      // alert('role for :' +id)
      // let role;
      await usersRef.doc(id).get().then((doc)=>setCurrentRole(doc.data().role)).then(()=>setRolePending(false))
    }

    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      
      try {
        user.uid !== null && getRole(user.uid)
      } catch (error) {

      }
      // user.uid !== null && getRole(user.uid)
      // setCurrentRole(  )
      // user.uid !== null && alert(user.uid);
      setPending(false);

    });
  }, []);



  if (pending) {
    return <span className="gridCenter"><SpinnerGroup/></span>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allowCoach,
        allowStudent,
        // currentRole,
        // rolePending
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



