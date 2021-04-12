import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faClipboardList,
  faUsers,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../base";
import { ModalContext } from "../Modals/ModalContext";
import { AuthContext } from "../Authorization/Auth";
import "./NM.css";

const dhda_banner = process.env.PUBLIC_URL + "/Assets/banner_ultra_alpha.svg";

const NavMenu = () => {
  const { currentUser } = useContext(AuthContext);
  const { toggleSignInModal } = useContext(ModalContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
        <NavbarBrand href="/">
          <img className="brand" src={dhda_banner} alt={"DHDA"} />{" "}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/MateoKost/Distance_Health_Distance_Active_Remaster">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          {currentUser ? (
            <span>
              <NMButton
                disabled={true}
                onClick={() => console.log("Grupy")}
                icon={faUsers}
                label="Grupy"
              />
              <NMButton
                disabled={true}
                onClick={() => console.log("Zadania")}
                icon={faClipboardList}
                label="Zadania"
              />
              <NMButton
                disabled={true}
                onClick={() => console.log("Profil")}
                icon={faUser}
                label="Profil"
              />
              <NMButton
                disabled={false}
                onClick={() => auth.signOut()}
                icon={faSignOutAlt}
                label="Wyloguj się"
              />
            </span>
          ) : (
            <NMButton
              onClick={() => toggleSignInModal()}
              icon={faSignInAlt}
              label="Zaloguj"
            />
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

const NMButton = ({ onClick, icon, label, disabled }) => {
  const btnStyle = {
    minWidth: "100px",
    borderWidth: "0px",
  };

  return (
    <Button color="dark" style={btnStyle} onClick={onClick} disabled={disabled}>
      <div>
        <FontAwesomeIcon icon={icon} className="fa-lg" />
      </div>
      <div style={{ marginTop: -4 }}>
        <span style={{ fontSize: 12 }}>{label}</span>
      </div>
    </Button>
  );
};

export default NavMenu;
