import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faRunning,
  faDumbbell,
  faCalendar,
  faChalkboardTeacher,
  faChevronDown,
  faChevronRight,
  faFootballBall,
  faSwimmer,
  faBiking,
faTrash,
faPen,
faStar

} from "@fortawesome/free-solid-svg-icons";

const ItemIconNames = [
  { name: "running", faIcon: <FontAwesomeIcon icon={faRunning} /> },
  { name: "gym", faIcon: <FontAwesomeIcon icon={faDumbbell} /> },
  { name: "ball", faIcon: <FontAwesomeIcon icon={faFootballBall} /> },
  { name: "swim", faIcon: <FontAwesomeIcon icon={faSwimmer} /> },
  { name: "bike", faIcon: <FontAwesomeIcon icon={faBiking} /> },

  { name: "calendar", faIcon: <FontAwesomeIcon icon={faCalendar} /> },
  { name: "coach", faIcon: <FontAwesomeIcon icon={faChalkboardTeacher} /> },
  { name: "add", faIcon: <FontAwesomeIcon icon={faPlus} /> },
  { name: "down", faIcon: <FontAwesomeIcon icon={faChevronDown} /> },
  { name: "right", faIcon: <FontAwesomeIcon icon={faChevronRight} /> },
  { name: "delete", faIcon: <FontAwesomeIcon icon={faTrash} /> },
  { name: "edit", faIcon: <FontAwesomeIcon icon={faPen} /> },
  { name: "star", faIcon: <FontAwesomeIcon icon={faStar} /> },
];

export default ItemIconNames;
