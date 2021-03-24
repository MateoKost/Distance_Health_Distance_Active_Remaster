import React, { useEffect, useState } from "react";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [signInModal, setSignInModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  function toggleSignInModal(){
    console.log("signInModal:"+signInModal)
    setSignInModal(!signInModal) 
    // this.setState({
    //   signInModal: !this.state.signInModal
    // })
  };

  function toggleRegisterModal(){
    console.log("registerModa:"+registerModal)
    setRegisterModal(!registerModal)
    // this.setState({
    //   registerModal: !this.state.registerModal
    // })
  };


//   const [pending, setPending] = useState(true);
//   // const [userFireData, setUserFireData] = useState(null);

//   const usersRef = firestore.collection("users");


  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setPending(false);
    // });
  }, []);

//   if (pending) {
//     return <>Loading...</>;
//   }

  return (
    <ModalContext.Provider
      value={{
        signInModal,registerModal,toggleSignInModal,toggleRegisterModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};