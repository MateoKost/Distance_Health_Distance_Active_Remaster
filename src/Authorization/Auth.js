import React, { useEffect, useState  } from "react";
import { firestore,auth, firebase_auth } from "../base.js";
import SpinnerGroup from "../Utilities/SpinnerGroup";
import "../Utilities/Spinner.css"

// import { useCollectionData } from "react-firebase-hooks/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState({admin: false, coach:false, student:false});
  const [rolePending, setRolePending] = useState(true);
  const [pending, setPending] = useState(true);

  const usersRef = firestore.collection("users");

  function allowCoach(){
    return !rolePending && currentRole.coach;
  }

  function allowStudent(){
    console.log(currentRole.student)
    return !rolePending && currentRole.student;
  }



  useEffect(() => {
    async function getRole(id) {
      await usersRef.doc(id).get().then((doc)=>setCurrentRole(doc.data().role)).then(()=>setRolePending(false))
    }

    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      
      try {
        user.uid !== null && getRole(user.uid)
      } catch (error) {

      }
      setPending(false);
    });
  }, []);


  async function signInWithGoogle(){
    try {
      const provider = new firebase_auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    } catch (error) {
      alert(error);
    }
  }

  async function signInWithEmailAndPassword({ email, password }){
    try {
      await auth
        .signInWithEmailAndPassword(email.value, password.value);
      // history.push("/");
    } catch (error) {
      alert(error);
    }
  }


  async function createUserWithEmailAndPassword({ email, password, coach }){
    try {
      await auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((result) => {
          usersRef.doc(result.user.uid).set({
            role: {
              admin: false,
              coach: coach.checked,
              student: !coach.checked,
            },
            screenName: result.user.email,
          });
        });
    } catch (error) {
      alert(error);
    }
  }

  if (pending) {
    return <span className="gridCenter"><SpinnerGroup/></span>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allowCoach,
        allowStudent,

        signInWithGoogle,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


// export const signOut = () => {
//   auth.signOut();
// };



