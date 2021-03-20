import { MicrosoftLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { React, Component } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

import {
  auth,firebase_auth,
  firestore,
  signInWithGoogle,
} from "../base";

import { useCallback, useContext } from "react";
import { withRouter } from "react-router";
// import app from "./base.js";
import { AuthContext } from "../Auth.js";

const SignInModal = (props, { history }) => {



  const toggleSignInModal = () => {
    props.onCancel();
  }


  // const login = async () => {
  //   console.log('hihi');
  
  // }

  const login = useCallback(
    async event => {
      // event.preventDefault();
      // const { email, password } = event.target.elements;
      try {
        const provider = new firebase_auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
          // .signInWithEmailAndPassword(email.value, password.value);
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  // logOut = async () =>{
  //   localStorage.clear();
  // }

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

    return (
      <div>
        {/* {  this.state.store && <Redirect from="/" to="/dashboard" /> } */}
        {/* {  this.state.authOk && <Redirect from="/" to="/dashboard" /> } */}

        <Modal isOpen={props.signInModal}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            Zaloguj
          </ModalHeader>
          <ModalBody>
            {/* <FormGroup>
              <Label for="login">E-mail</Label>
              <Input
                required
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={loginData.login}
                onChange={(e) => {
                  loginData.email = e.target.value;
                  this.setState({ loginData });
                }}
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
                value={loginData.password}
                onChange={(e) => {
                  loginData.password = e.target.value;
                  this.setState({ loginData });
                }}
              />
            </FormGroup> */}
            <Button
              color="success"
              className="btn-lg  btn-block"
              onClick={()=>{login()}}
            >
              Zaloguj się
            </Button>
            {/* <span className="text-center pt-3"> Zaloguj się przez </span> */}
            {/* <GoogleLoginButton />
            <FacebookLoginButton /> */}
            <div className="text-center">
              <a href="/sign-up">Zarejestruj się</a>
              <span className="p=2"> | </span>
              <a href="/forgot-password">Zapomniałeś hasła?</a>
            </div>

            <GoogleLoginButton style={{backgroundColor: "white !important"}}  onClick={login}><span>Kontynuuj z kontem Google</span></GoogleLoginButton>
                <MicrosoftLoginButton><span>Kontynuuj z kontem Office 365</span></MicrosoftLoginButton>

          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" >Add</Button>{' '} */}
            <Button
              color="secondary"
              onClick={toggleSignInModal.bind(this)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Modal>
        {/* {this.renderRedirect()}  */}
      </div>
    );
    
}
export default  withRouter(SignInModal);
  