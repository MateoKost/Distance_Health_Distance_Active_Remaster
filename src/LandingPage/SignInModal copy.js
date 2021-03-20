import { MicrosoftLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Label, FormGroup, Input, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { React, Component } from 'react';
import { Redirect } from "react-router-dom";
import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

import {
  auth,
  firestore,
  signInWithGoogle,
} from "../base";

class SignInModal extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      loginData:{
        email:null,
        password:null,
      },
      login:false,
      store:null,

      signInModal: props.signInModal,
      onCancel: props.onCancel,

      authOk:false,

    };
  }



  componentDidMount() {
    this.storeCollector()
  }

  toggleSignInModal() {
    this.state.onCancel();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      signInModal: nextProps.signInModal,
    });
  }


  storeCollector()
  {
    let store = JSON.parse(localStorage.getItem('login'));
   
    if(store && store.login){
      this.setState({login:true,store:store})
    }
  }

  login = async () =>
  {
    console.log('hihi');
    signInWithGoogle();

    auth.onAuthStateChanged(      this.setState({authOk:true}))


    
    // if(this.state.store.store){
   
    //   // useHistory().push("/manage");
    // }

    // let loginParams = {
    //   "email": this.state.loginData.email,
    //   "password": this.state.loginData.password
    //  //  "email": "adam@wp.pl",
    //   //"password": "123456"
    // };
    // console.log(loginParams);
    // axios.post('https://localhost:5001/login', loginParams) 
    //   .then((result)=>{
    //   console.warn("result",result);
      
    //   localStorage.setItem('login',JSON.stringify({
    //     login:true,
    //     store:result.data.token,
    //     loginData:this.state.loginData
    //     // email: this.state.loginData.email,
    //     // password: this.state.loginData.password
    //   }))




      // this.storeCollector()

/*

      if(this.state.store.store){
   
        useHistory().push("/manage");
      }
*/
    // })
  }
  get = async () => {
 
    // let token = "Bearer " + this.state.store.store
    // console.log(token);
    // axios.get('https://localhost:5001/item', {
    //   headers:{
    //     'Authorization':token
    //   }
    // }).then((response) => {
    //   console.log(response.data)
    // })
    
  }

  logOut = async () =>{
    localStorage.clear();
  }


  render() {
    const { signInModal, loginData } = this.state;

    return (
      <div>
        {/* {  this.state.store && <Redirect from="/" to="/dashboard" /> } */}
        {  this.state.authOk && <Redirect from="/" to="/dashboard" /> }

        <Modal isOpen={signInModal}>
          <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
            Zaloguj
          </ModalHeader>
          <ModalBody>
            <FormGroup>
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
            </FormGroup>
            <Button
              color="success"
              className="btn-lg  btn-block"
              onClick={()=>{this.login()}}
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

            <GoogleLoginButton style={{backgroundColor: "white !important"}}  onClick={this.login}><span>Kontynuuj z kontem Google</span></GoogleLoginButton>
                <MicrosoftLoginButton><span>Kontynuuj z kontem Office 365</span></MicrosoftLoginButton>

          </ModalBody>
          <ModalFooter>
            {/* <Button color="primary" >Add</Button>{' '} */}
            <Button
              color="secondary"
              onClick={this.toggleSignInModal.bind(this)}
            >
              Anuluj
            </Button>
          </ModalFooter>
        </Modal>
        {/* {this.renderRedirect()}  */}
      </div>
    );
  }
}
export default SignInModal;
  