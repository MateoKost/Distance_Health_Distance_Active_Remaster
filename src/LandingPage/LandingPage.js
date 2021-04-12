import React, { useContext } from "react";
import { Button } from "reactstrap";
import "./LP.css";
import NavMenu from "./NavMenu";
import AutoSlider from "./AutoSlider";
import SignInModal from "../Authorization/SignInModal";
import RegisterModal from "../Authorization/RegisterModal";
import RegisterInfoModal from "../Authorization/RegisterInfoModal";
import { ModalProvider } from "./ModalContext";
import { ModalContext } from "./ModalContext";

const LandingPage = () => {
  return (
    <div>
      <ModalProvider>
        <NavMenu />
        <AutoSlider />
        <footer class="footer">
          <RegisterButton />
        </footer>
        <SignInModal />
        <RegisterModal />
        <RegisterInfoModal />
      </ModalProvider>
    </div>
  );
  // }
};

export default LandingPage;

const RegisterButton = () => {
  const { toggleRegisterModal } = useContext(ModalContext);

  return (
    <Button
      color="dark"
      className="p-4"
      onClick={() => {
        toggleRegisterModal();
      }}
    >
      {" "}
      Zarejestruj się{" "}
    </Button>
  );
};
