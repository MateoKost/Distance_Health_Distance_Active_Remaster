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
// import "../App.css";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHammer,
  faSignOutAlt,
  faTasks,
  faUser,
  faCalendarAlt,
  faTask,
  faCalendarDay,
  faClipboardList,
  faUsers
} from "@fortawesome/free-solid-svg-icons";


import { auth } from "../../base";

import "./NM.css";

// import dhda from "../../../public/Assets/DHDA_alpha.png";
// import { ReactComponent as YourSvg } from `${process.env.PUBLIC_URL}/Assets/banner.svg`;

const dhda = process.env.PUBLIC_URL + '/Assets/DHDA_alpha.png';
// const dhda_banner = process.env.PUBLIC_URL + '/Assets/banner_ultra_alpha.svg';
const dhda_banner = process.env.PUBLIC_URL + '/Assets/banner_ultra_alpha.svg';
// "%PUBLIC_URL%/favicon.ico"

const NavMenu = () => {
  const history = useHistory();

  return (
    <div>
      <Navbar className="navbar-dark bg-dark" expand="md">
    <NavbarBrand href="/"><img  className="dhda" src={dhda_banner} alt={"DHDA"} /> </NavbarBrand> 
        {/* <NavbarBrand href="/"><img  className="dhda" src={dhda} alt={"DHDA"} /> <span className="ml-2">Distance Health Distance Active</span></NavbarBrand> */}
        <NavbarToggler
        // onClick={toggle}
        />
        <Collapse
          // isOpen={isOpen}
          navbar
        >
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/MateoKost/Distance_Health_Distance_Active_Remaster">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>

          <NMButton
            onClick={() => console.log("Grupy")}
            icon={faUsers}
            label="Grupy"
          />

                      <NMButton
            onClick={() => console.log("Zadania")}
            icon={faClipboardList}
            label="Zadania"
          />
          <NMButton
            onClick={() => console.log("Profil")}
            icon={faUser}
            label="Profil"
          />

          <NMButton
            onClick={() => auth.signOut()}
            icon={faSignOutAlt}
            label="Wyloguj się"
          />

        </Collapse>
      </Navbar>
    </div>
  );
};

const NMButton = ({ onClick, icon, label }) => {

  const btnStyle = {
    minWidth: "100px",
    borderWidth: "0px"
  }

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

export default NavMenu;
