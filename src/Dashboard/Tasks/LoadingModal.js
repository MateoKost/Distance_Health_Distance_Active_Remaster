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
} from "../../base";
// import { AuthContext } from "../../Authorization/Auth.js";


// import "../App.css";

import { FireDataContext } from "../../Authorization/FireDataContext";

import SpinnerGroup from '../../Utilities/SpinnerGroup';

const LoadingModal = (props) => {

  // const [loginData, setLoginData] = useState({login:"", password:""});

  // const toggleLoadingModal = () => {
  //   props.onCancel();
  // };

  // const login = useCallback(
  //   async (event) => {
  //     // event.preventDefault();
  //     // const { email, password } = event.target.elements;
  //     try {
  //       const provider = new firebase_auth.GoogleAuthProvider();
  //       await auth.signInWithPopup(provider);
  //       // alert(currentUser.uid);
  //       // console.log(currentUser.uid)
  //       // .signInWithEmailAndPassword(email.value, password.value);
  //       // history.push("/");
  //     } catch (error) {
  //       alert(error);
  //     }
  //   },
  //   [history]
  // );

  const { isResultModalActive, isResultSent } = useContext(FireDataContext);

  if ( isResultSent ) {
    console.log("patrzę czy isResultSent - "+isResultSent);
    window.location.reload();
  }

  return (
    <div>
      <Modal isOpen={isResultModalActive} >
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
          Trwa przesyłanie wyników
        </ModalHeader>
        <ModalBody>
        <SpinnerGroup/>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" 
          // onClick={}
          >
            Przerwij
          </Button>

        </ModalFooter>
      </Modal>
      {/* {this.renderRedirect()}  */}
    </div>
  );
};
export default withRouter(LoadingModal);
