import React, { useContext } from "react";
import { FireDataContext } from "../FireData/FireDataContext";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledAlert,
} from "reactstrap";
import "./NM.css";

const NMAction = ({ title, actions }) => {
  const { alertVisibility } = useContext(FireDataContext);
  return (
    <div>
      <Navbar expand={true}>
        <NavbarBrand></NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>{title}</NavItem>
          </Nav>
          <NavbarToggler />
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
