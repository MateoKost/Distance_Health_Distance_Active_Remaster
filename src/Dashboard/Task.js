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

import Uploader from "./Uploader/Uploader.js";
// import format from 'date-fns/format'
import ItemIconNames from "./IconNames";

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
      {/* <div className="product">
                  <FontAwesomeIcon
                    className="fa-3x"
                    icon={faPen}
                  ></FontAwesomeIcon>
                </div> */}

      {/* <CardImg width="320px" height="200px" src={Newicon}/> */}

      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>

        <Row>
          <Col lg="4" className="text-center">
            <span className="fa-5x ">
              {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />}
            </span>
            {/* <FontAwesomeIcon 
                    className="fa-3x"
                    icon={faPen}
                  ></FontAwesomeIcon> */}
          </Col>
          <Col lg="8" className="text-left p-lg-3 mb-2">
            <Table borderless>
              {/* <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead> */}
              <tbody>
                <tr>
                  <th className="text-center" scope="row">
                    {coachIcon.faIcon}
                  </th>
                  <td>{coach}</td>
                  {/* <td>Otto</td> */}
                </tr>
                <tr>
                  <th className="text-center" scope="row">
                    {calendarIcon.faIcon}
                  </th>
                  <td>{d}</td>
                  {/* <td>Otto</td> */}
                </tr>
              </tbody>
            </Table>

            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
            {coachIcon.faIcon}  {coach}
            </CardSubtitle> */}
            {/* <CardText>Użytkownik: { user } </CardText>
                  <CardText>Dystans: { distance } m</CardText>
                  <CardText>Limit: { limit } min</CardText> */}

            {/* <CardText>Trener: { coach } </CardText> */}
            {/* <CardText> {calendarIcon.faIcon} {d} </CardText> */}
            {/* <CardText> { id } </CardText> */}
          </Col>
        </Row>

        <CardText>
          <DetailsExpand id={id} notes={notes} />
        </CardText>

        <CardText>
          <Uploader cardId={id} />
        </CardText>

        {/* <Button onClick={ this.toggleNewModal.bind(this) }>Rozlicz się</Button> */}
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
        {/* {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />} {" "} */}
        {downIcon.faIcon}
        {/* <FontAwesomeIcon icon={faLongArrowAltUp} className="fa-lg" /> */}{" "}
        Szczegóły
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
        <Card>
          {/* <CardHeader>Prześlij plik</CardHeader> */}

          <CardBody>
            <Table>
              {/* <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead> */}

              <thead>
                <tr>
                  <th>Ocena</th>
                  <th>Rygor</th>
                </tr>
              </thead>

              <tbody>
                {/* <tr>
                  <th className="text-center" scope="row">
            
                    {coachIcon.faIcon}
                  </th>
                  <td>{coach}</td>

                </tr> */}

                {["B", "C", "D"].map((ch) => (
                  <tr>
                    <th className="text-center" scope="row">
                      {ch}
                    </th>
                    <td>{props.notes[`${ch}`]}</td>
                    {/* <td>Otto</td> */}
                  </tr>
                ))}

                {/* {props.notes.map((note)=>{console.log(note)})} */}

                {/* <button onClick={()=>props.notes.map((a)=>console.log(a))}></button> */}
                {/* <button onClick={()=>console.log(props.notes.B)}></button> */}
              </tbody>
            </Table>

            {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
            <CardText>{/* <DragAndDrop setFiles={setVideoFile} /> */}</CardText>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
};
