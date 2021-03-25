import React, { useContext } from 'react';
import { Button} from 'reactstrap';
import './LP.css';
import NavMenu from './NavMenu';
import AutoSlider from './AutoSlider';
import SignInModal from "../Authorization/SignInModal";
import RegisterModal from "../Authorization/RegisterModal";
import RegisterInfoModal from "../Authorization/RegisterInfoModal";

import { ModalProvider } from "./ModalContext";
import { ModalContext } from "./ModalContext";


// class LandingPage extends Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       signInModal:false,
  //       registerModal:false,

  // //const { signInModal, setSignInModal } = useState(false);
  //     };
  //     this.toggleSignInModal = this.toggleSignInModal.bind(this);
  //     this.toggleRegisterModal = this.toggleRegisterModal.bind(this);


 const LandingPage  = () => {

    // };

  // toggleSignInModal(){
  //   this.setState({
  //     signInModal: !this.state.signInModal
  //   })
  // };

  // toggleRegisterModal(){
  //   this.setState({
  //     registerModal: !this.state.registerModal
  //   })
  // };

  // const { signInModal, registerModal, toggleRegisterModal, toggleSignInModal } = useContext(
  //   ModalContext
  // );

  
  // render() {
  return (
      <div>
        <ModalProvider >
        {/* <NavMenu onClick={this.toggleSignInModal} /> */}
        <NavMenu  /> 
        <AutoSlider />
        <footer class="footer">
      {/* <div class="container"> */}
          <RegisterButton /> 
        {/* <span class="text-muted">Place sticky footer content here.</span> */}
      {/* </div> */}
    </footer>
        {/* <RegisterButton />  */}
        {/* <SignInModal signInModal={ this.state.signInModal } onCancel={this.toggleSignInModal} onActiveOther={this.toggleRegisterModal}/> */}
         <SignInModal />
         {/* <RegisterModal registerModal={ this.state.registerModal } onCancel={this.toggleRegisterModal} onActiveOther={this.toggleSignInModal}/> */}
        <RegisterModal />
        <RegisterInfoModal />
        </ModalProvider>
    </div>
  );
// }
}

export default LandingPage;


const RegisterButton  = () => {
 
  const { toggleRegisterModal } = useContext( ModalContext);

  return (
    <Button color="dark" className="p-4" onClick={ 
      () => { 
        toggleRegisterModal();  }
    } > Zarejestruj się  </Button>
  )

}