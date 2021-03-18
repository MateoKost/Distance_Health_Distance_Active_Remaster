//import '../../../App.css';
import React, { Component } from 'react';

import AutoSlider from './AutoSlider';

import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import './LP.css';
import NavMenu from './NavMenu';
import SignInModal from "./SignInModal";
// import RegisterModal from "../../Modals/RegisterModal";

class LandingPage extends Component {
    constructor(props){
      super(props);
      this.state = {
        signInModal:false,
        registerModal:false,

  //const { signInModal, setSignInModal } = useState(false);
      };
      this.toggleSignInModal = this.toggleSignInModal.bind(this);
      this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    };

  toggleSignInModal(){
    this.setState({
      signInModal: !this.state.signInModal
    })
  };

  toggleRegisterModal(){
    this.setState({
      registerModal: !this.state.registerModal
    })
  };

  render() {
  return (
      <div>
        <NavMenu onClick={this.toggleSignInModal} />
        <AutoSlider />
        <Button color="dark" className="m-4 p-4" onClick={ this.toggleRegisterModal } > Zarejestruj się  </Button>
        <SignInModal signInModal={ this.state.signInModal } onCancel={this.toggleSignInModal} />
        {/* <RegisterModal registerModal={ this.state.registerModal } onCancel={this.toggleRegisterModal}/> */}
    </div>
  );
}
}

export default LandingPage;
