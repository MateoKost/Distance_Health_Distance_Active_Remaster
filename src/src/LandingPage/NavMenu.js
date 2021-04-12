import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import { ModalContext } from "./ModalContext";

import React, { useContext,useState } from "react";

const NavMenu = (props) => {
  const { toggleSignInModal } = useContext(ModalContext);
  const dhda_banner = process.env.PUBLIC_URL + '/Assets/banner_ultra_alpha.svg';

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        {/* <img  className="logo" src={eszef}  alt={"Eszef"} /> */}
        <NavbarBrand href="/"><img  className="dhda" src={dhda_banner} alt={"DHDA"} /> </NavbarBrand> 
        {/* <NavbarBrand href="/">#DistanceHealthDistanceActive</NavbarBrand> */}
        <NavbarToggler
        onClick={toggle}
        />
        <Collapse
          isOpen={isOpen}
          navbar
        >
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink href="https://github.com/MateoKost/Distance_Health_Distance_Active_Remaster">
                GitHub
              </NavLink>
            </NavItem>

          </Nav>

          <NMButton
            onClick={() => toggleSignInModal()}
            icon={faSignInAlt}
            label="Zaloguj"
          />
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;

const NMButton = ({ onClick, icon, label }) => {
  const btnStyle = {
    minWidth: "100px",
    borderWidth: "0px",
  };

  return (
    <Button color="dark" style={btnStyle} onClick={onClick}>
      <div>
        <FontAwesomeIcon icon={icon} className="fa-lg" />
      </div>
      <div style={{ marginTop: -4 }}>
        <span style={{ fontSize: 12 }}>{label}</span>
      </div>
    </Button>
  );
};
