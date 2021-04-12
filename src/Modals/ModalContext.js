import React, { useState } from "react";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [signInModal, setSignInModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  function toggleSignInModal() {
    setSignInModal(!signInModal);
  }

  function toggleRegisterModal() {
    setRegisterModal(!registerModal);
  }

  return (
    <ModalContext.Provider
      value={{
        signInModal,
        registerModal,
        toggleSignInModal,
        toggleRegisterModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
