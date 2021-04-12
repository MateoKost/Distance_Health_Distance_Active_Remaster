import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button,UncontrolledAlert
  } from "reactstrap";
  
  import "./NM.css";
  import { FireDataContext } from "../../Authorization/FireDataContext";

  import React, { useContext } from "react";

  const NMAction = ({title, actions}) => {

    const { alertVisibility } = useContext(FireDataContext);

    return (
      <div>
        <Navbar expand={true}>
          <NavbarBrand ></NavbarBrand>
             <NavbarToggler
        // onClick={toggle}
        />
          <Collapse
            // isOpen={isOpen}
            navbar
          >
     
          <Nav className="mr-auto" navbar>
          <NavItem>
          {/* <NavLink > */}
   
    
          {title}
          {/* </NavLink> */}
            </NavItem>
            </Nav>
          <NavbarToggler
          // onClick={toggle}
          />

{actions}
  
          </Collapse>
        </Navbar>
        {alertVisibility && (
        <UncontrolledAlert color="success">
          <b>Dodano zadanie</b>
        </UncontrolledAlert>
      )}
      </div>
    );
  };
    
  export default NMAction;
  