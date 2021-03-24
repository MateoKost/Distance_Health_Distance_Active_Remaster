import { 
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText
} from 'reactstrap';

import { useHistory } from "react-router-dom";
//import '../../App.css';
//import eszef from "../../Assets/Eszef.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";

import {
signOut
} from "../base";

// import { ModalProvider } from "./ModalContext";
import { ModalContext } from "./ModalContext";

import React, { useContext } from 'react';

const NavMenu = (props) => {

  const history = useHistory();


  const { signInModal,toggleSignInModal } = useContext(
    ModalContext
  );


  return (





<div>
      <Navbar className="navbar-dark bg-dark"  expand="md">
      {/* <img  className="logo" src={eszef}  alt={"Eszef"} /> */}
        <NavbarBrand href="/">#DistanceHealthDistanceActive</NavbarBrand>
        <NavbarToggler 
        // onClick={toggle} 
        />
        <Collapse 
        // isOpen={isOpen} 
        navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="https://github.com/MateoKost/Distance_Health_Distance_Active_Remaster">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>


          <NMButton 
            onClick={() =>toggleSignInModal()}
            icon={faSignInAlt}
            label="Zaloguj"
          />

{/* 
          <Button color="dark" style={{minWidth:"100px"}} onClick={toggleSignInModal} >
            <div><FontAwesomeIcon icon={faSignInAlt} className="fa-lg"/></div>
            <div style={{marginTop: -4}}><span style={{fontSize: 12}}>Zaloguj</span></div>
            </Button> */}
          {/* <NavbarText>Zaloguj</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
)};

export default NavMenu;



const NMButton = ({ onClick, icon, label }) => {

  const btnStyle = {
    minWidth: "100px",
    borderWidth: "0px"
  }

  return (
    <Button color="dark" style={btnStyle} onClick={onClick} >
      <div>
        <FontAwesomeIcon icon={icon} className="fa-lg" />
      </div>
      <div style={{ marginTop: -4 }}>
        <span style={{ fontSize: 12 }}>{label}</span>
      </div>
    </Button>
  );
};