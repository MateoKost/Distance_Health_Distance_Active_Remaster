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

const RegisterModal = () => {
  const { currentUser, createUserWithEmailAndPassword } = useContext(
    AuthContext
  );

  const { registerModal, toggleRegisterModal, toggleSignInModal } = useContext(
    ModalContext
  );

  const handleSignUp = async (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(event.target.elements);
  };

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Modal isOpen={registerModal} toggle={toggleRegisterModal}>
        <ModalHeader
          cssModule={{ "modal-title": "w-100 text-center" }}
          toggle={toggleRegisterModal}
        >
          Rejestracja
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSignUp}>
            <FormGroup>
              <Label for="login">Adres e-mail</Label>
              <Input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Hasło (co najmniej 6 znaków)</Label>
              <Input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Hasło"
              />
            </FormGroup>
            <FormGroup check required>
              <Label check>
                <Input type="checkbox" name="coach" id="coach" />
                Konto trenera
              </Label>
            </FormGroup>
            <Button
              color="success"
              className="btn-lg  btn-block"
              type="submit"
              // onClick={() => {
              //   login();
              // }}
            >
              Zarejestruj się
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
            >
              <span>Dołącz z kontem Google</span>
            </GoogleLoginButton>
            <MicrosoftLoginButton className="disabled">
              <span>Dołącz z kontem Office 365</span>
            </MicrosoftLoginButton>
            <p className="text-center mt-3">
              Masz już konto?{" "}
              <span
                className="noAnchor"
                onClick={() => {
                  toggleRegisterModal();
                  toggleSignInModal();
                }}
              >
                Zaloguj się{" "}
              </span>{" "}
            </p>
          </FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default withRouter(RegisterModal);
