import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardColumns,
  CardSubtitle,
  CardBody,
  Button,
  Row,
  Col,
  Table,
  UncontrolledCollapse,
} from "reactstrap";

import Uploader from "../Uploader/Uploader.js";
// import format from 'date-fns/format'
import ItemIconNames from "../../Utilities/IconNames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPen,
  faLightBulb,
  faChair,
  faFireExtinguisher,
  faTshirt,
  faMugHot,
  faInbox,
  faBed,
  faBookOpen,
  faBook,
  faMedkit,
  faFileAlt,
  faKey,
  faServer,
  faBroom,
  faBrush,
  faLightbulb,
  faRunning,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

const TaskCard = ({ id, coach, name, type, status, start, end, notes }) => {
  const icon = ItemIconNames.find((item) => item.name === type);
  const calendarIcon = ItemIconNames.find((item) => item.name === "calendar");
  const coachIcon = ItemIconNames.find((item) => item.name === "coach");

  //   const isoDate = end.toDate().toDateString();
  const isoDate = end.toDate().toISOString();
  const d = new Date(isoDate).toLocaleDateString("en-GB");
  //   d.;

  return (
    <Card key={id}>
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        {/* <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle> */}
        <Row>
          <Col lg="4" className="text-center">
            <span className="fa-5x ">
              {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />}
            </span>
          </Col>
          <Col lg="8" className="text-left p-lg-3 mb-2" style={{overflowX: "auto"}}>
            <Table borderless >
              <tbody >
                <tr>
                  <th className="text-center" scope="row">
                    {coachIcon.faIcon}
                  </th>
                  <td >{coach}</td>
                </tr>
                <tr>
                  <th className="text-center" scope="row">
                    {calendarIcon.faIcon}
                  </th>
                  <td>{d}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <CardText>
          <DetailsExpand id={id} notes={notes} />
        </CardText>

        <CardText>
          <Uploader cardId={id} />
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TaskCard;

const DetailsExpand = (props) => {
  const cardId = `detailsToggler-${props.id}`;

  const downIcon = ItemIconNames.find((item) => item.name === "down");

  return (
    <div>
      <Button id={cardId} size="lg" block>
        {downIcon.faIcon}
        Szczegóły
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
        {/* <Card> */}
          {/* <CardBody> */}
            <Table>
              <thead>
                <tr>
                  <th>Ocena</th>
                  <th>Rygor</th>
                </tr>
              </thead>
              <tbody>
                {["B", "C", "D"].map((ch) => (
                  <tr>
                    <th className="text-center" scope="row">
                      {ch}
                    </th>
                    <td>{props.notes[`${ch}`]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          {/* </CardBody> */}
        {/* </Card> */}
      </UncontrolledCollapse>
    </div>
  );
};
