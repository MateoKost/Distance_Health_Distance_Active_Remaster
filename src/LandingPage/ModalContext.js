import React, { useState } from "react";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [signInModal, setSignInModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [registerInfoModal, setRegisterInfoModal] = useState(false);

  function toggleSignInModal() {
    console.log("signInModal:" + signInModal);
    setSignInModal(!signInModal);
  }

  function toggleRegisterModal() {
    console.log("registerModa:" + registerModal);
    setRegisterModal(!registerModal);
  }

  function toggleRegisterInfoModal() {
    console.log("registerModa:" + registerModal);
    setRegisterInfoModal(!registerInfoModal);
  }

  return (
    <ModalContext.Provider
      value={{
        signInModal,
        registerModal,
        toggleSignInModal,
        toggleRegisterModal,
        registerInfoModal,
        toggleRegisterInfoModal
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
