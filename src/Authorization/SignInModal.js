import {
  MicrosoftLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  Label,
  Form,
  FormGroup,
  Input,
  Table,Row,Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { React, useState, useCallback, useContext,useCollectionData } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { auth, firebase_auth,
        firestore
} from "../base";
import { AuthContext } from "./Auth.js";
import "../App.css";

import { ModalContext } from "../LandingPage/ModalContext";

const SignInModal = (props, { history }) => {

  // const [loginData, setLoginData] = useState({login:"", password:""});

  // const toggleSignInModal = () => {
  //   props.onCancel();
  // };

  const login = useCallback(
    async (event) => {
      // event.preventDefault();
      // const { email, password } = event.target.elements;
      try {
        const provider = new firebase_auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
        // alert(currentUser.uid);
        // console.log(currentUser.uid)
        // .signInWithEmailAndPassword(email.value, password.value);
        // history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email.value+password.value);
      try {
        await auth
          .signInWithEmailAndPassword(email.value, password.value);
        // history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { signInModal, registerModal, toggleRegisterModal, toggleSignInModal } = useContext(
    ModalContext
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <Modal isOpen={signInModal} toggle={toggleSignInModal}>
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }} toggle={toggleSignInModal}>
          Logowanie
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleLogin}>
          <FormGroup >
              <Label for="login">E-mail</Label>
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
            <FormGroup>
              <Label for="password">Hasło</Label>
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
                        <p className="text-right mt-3"><a href="javascript:null" 
          > Zapomniałeś hasła?</a> </p>
            </FormGroup>
          <Button
            color="success"
            className="btn-lg  btn-block"
            type="submit"
            // onClick={() => {
            //   login();
            // }}
          >
            Zaloguj się
          </Button>
          </Form>


          {/* <span className="text-center pt-3"> Zaloguj się przez </span> */}
          {/* <GoogleLoginButton />
            <FacebookLoginButton /> */}
          {/* <div className="text-center"> */}
            {/* <a href="/sign-up">Zarejestruj się</a>
            <span className="p=2"> | </span> */}
  
            {/* <a href="/forgot-password">Zapomniałeś hasła?</a> */}
          {/* </div> */}

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

            // className="GButton"
            // style={{ backgroundColor: "lightblue" }}
            onClick={login}
          >
            <span>Kontynuuj z kontem Google</span>
          </GoogleLoginButton>
          <MicrosoftLoginButton>
            <span>Kontynuuj z kontem Office 365</span>
          </MicrosoftLoginButton>

          <p className="text-center mt-3">Nie masz jeszcze konta? <a href="javascript:null" 
          onClick={
            ()=> {
              toggleSignInModal();
              toggleRegisterModal();
              // props.onCancel();
              // props.onActiveOther();
              // toggleRegisterModal();
              // toggleSignInModal.bind(this)
            }
        
          }> Zarejestruj się</a> </p>

          {/* </Row> */}
          </FormGroup>

        </ModalBody>
        {/* <ModalFooter> */}
          {/* <Button color="primary" >Add</Button>{' '} */}
          {/* <Button color="secondary" onClick={toggleSignInModal}>
            Anuluj
          </Button> */}

        {/* </ModalFooter> */}
      </Modal>
      {/* {this.renderRedirect()}  */}
    </div>
  );
};
export default withRouter(SignInModal);
