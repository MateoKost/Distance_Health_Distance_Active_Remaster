import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPen, faLightBulb,  faChair,  faFireExtinguisher,  faTshirt,  faMugHot,  faInbox,  faBed,  
    faBookOpen,  faBook,  faMedkit,  faFileAlt,  faKey,  faServer,  faBroom,  faBrush,  faLightbulb, faRunning, faDumbbell, faCalendar, faChalkboardTeacher, faChevronDown
  } from '@fortawesome/free-solid-svg-icons'

const  ItemIconNames = [
          { name:"running", faIcon: <FontAwesomeIcon icon={faRunning} />},
          { name:"pushups", faIcon: <FontAwesomeIcon icon={faDumbbell} />},
          { name:"calendar", faIcon: <FontAwesomeIcon icon={faCalendar} />},
          { name:"coach", faIcon: <FontAwesomeIcon icon={faChalkboardTeacher} />},
          { name:"add", faIcon: <FontAwesomeIcon icon={faPlus} />},
          { name:"down", faIcon: <FontAwesomeIcon icon={faChevronDown} />},
];

export default ItemIconNames;
  