import {
  MicrosoftLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  Label,
  Form,
  FormGroup,
  Input,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { React, useContext } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "../Authorization/Auth";
import { ModalContext } from "./ModalContext";
import "../App.css";

const SignInModal = () => {
  const handleLogin = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(event.target.elements);
  };

  const { signInModal, toggleRegisterModal, toggleSignInModal } = useContext(
    ModalContext
  );

  const {
    currentUser,
    signInWithGoogle,
    signInWithEmailAndPassword,
  } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Modal isOpen={signInModal} toggle={toggleSignInModal}>
        <ModalHeader
          cssModule={{ "modal-title": "w-100 text-center" }}
          toggle={toggleSignInModal}
        >
          Logowanie
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label for="login">E-mail</Label>
              <Input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Hasło</Label>
              <Input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Hasło"
              />
              <p className="text-right mt-3 noAnchor disabled">
              Zapomniałeś hasła?{" "}
              </p>
            </FormGroup>
            <Button color="success" className="btn-lg  btn-block" type="submit">
              Zaloguj się
            </Button>
          </Form>
          <Row className="pt-2">
            <Col className="col-5">
              <hr class="solid" />
            </Col>
            <Col className="text-center">lub</Col>
            <Col className="col-5">
              <hr class="solid" />
            </Col>
          </Row>

          <FormGroup>
            <GoogleLoginButton 
              style={{ background: "#FFE4E1" }}
              activeStyle={{ background: "#FFBDBA" }}
              onClick={() => signInWithGoogle()}
            >
              Kontynuuj z kontem Google
            </GoogleLoginButton>
   
            <MicrosoftLoginButton className="disabled">
              Kontynuuj z kontem Office 365
            </MicrosoftLoginButton>
      
            <p className="text-center mt-3">
              Nie masz jeszcze konta? {" "}
              <span className="noAnchor"
                onClick={() => {
                  toggleSignInModal();
                  toggleRegisterModal();
                }}
              >
                Zarejestruj się
              </span>
            </p>
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default withRouter(SignInModal);
