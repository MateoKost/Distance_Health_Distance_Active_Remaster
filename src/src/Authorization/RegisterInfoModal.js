import {
  MicrosoftLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { React, useCallback, useContext, useCollectionData } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { auth, firebase_auth, firestore } from "../base";
import { AuthContext } from "./Auth.js";
import "../App.css";

import { ModalContext } from "../LandingPage/ModalContext";

const RegisterInfoModal = (props, { history }) => {
  // const toggleRegisterModal = () => {
  //   props.onCancel();
  // };
  
  const { currentUser } = useContext(
    AuthContext
  );

  const { registerInfoModal, toggleRegisterModal, toggleRegisterInfoModal } = useContext(
    ModalContext
  );

  // const usersRef = firestore.collection("users");
  // const [users] = useCollectionData(usersRef);
  const usersRef = firestore.collection("users");

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await auth
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((result) => {
            // console.log(result.user);
            // console.log(result.user.uid);
            // console.log(result.user.email);
            usersRef.doc(result.user.uid).set({
              role: {
                admin: false,
                coach: true,
                student: false,
              },
              screenName: result.user.email,
            });
            // usersRef.add({
            //   id: result.user.uid,
            //   role: {
            //     admin: false,
            //     coach: true,
            //     student: false,
            //   },
            //   screenName: result.user.email,
            // });
          });

        // const [users] = useCollectionData(usersRef, { idField: "id" });
        // setUserFireData();
        // userFireData
        // history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      {/* <Modal isOpen={props.registerModal}> */}
            <Modal isOpen={registerInfoModal} toggle={toggleRegisterInfoModal}>
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }} toggle={toggleRegisterInfoModal}>
          Ustawienia konta
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
                // value={loginData.login}
                // onChange={(e) => {
                //   loginData.email = e.target.value;
                // }}
              />
            </FormGroup>
            {/* 
            <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="forename">Imię</Label>
            <Input type="text" name="forename" id="forename" placeholder="Imię" required/>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="surname">Nazwisko</Label>
            <Input type="text" name="surname" id="surname" placeholder="Nazwisko" required/>
          </FormGroup>
        </Col>
      </Row> */}

            <FormGroup>
              <Label for="password">Hasło (co najmniej 6 znaków)</Label>
              <Input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Hasło"
                // value={loginData.password}
                // onChange={(e) => {
                //   loginData.password = e.target.value;
                //   this.setState({ loginData });
                // }}
              />
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
     
        </ModalBody>
        {/* <ModalFooter> */}
          {/* <Button color="primary" >Add</Button>{' '} */}
          {/* <Button color="secondary" onClick={toggleRegisterModal.bind(this)}> */}
            {/* Anuluj */}
          {/* </Button> */}
        {/* </ModalFooter> */}
      </Modal>
      {/* {this.renderRedirect()}  */}
    </div>
  );
};
export default withRouter(RegisterInfoModal);
