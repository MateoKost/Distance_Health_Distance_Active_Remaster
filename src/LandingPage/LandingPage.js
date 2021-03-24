import React, { Component } from 'react';
import { Button} from 'reactstrap';
import './LP.css';
import NavMenu from './NavMenu';
import AutoSlider from './AutoSlider';
import SignInModal from "../Authorization/SignInModal";
import RegisterModal from "../Authorization/RegisterModal";

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
        <SignInModal signInModal={ this.state.signInModal } onCancel={this.toggleSignInModal} onActiveOther={this.toggleRegisterModal}/>
        <RegisterModal registerModal={ this.state.registerModal } onCancel={this.toggleRegisterModal} onActiveOther={this.toggleSignInModal}/>
    </div>
  );
}
}

export default LandingPage;
