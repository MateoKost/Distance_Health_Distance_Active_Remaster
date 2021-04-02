import React, {useEffect, useContext} from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Table,
} from "reactstrap";

import Uploader from "../Uploader/Uploader.js";
import ItemIconNames from "../../Utilities/IconNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";

import DetailsExpand from "./DetailsExpand";
import ResultSent from "./ResultSent";


import { FireDataContext } from "../../Authorization/FireDataContext";
import { FireDataProvider } from "../../Authorization/FireDataContext";

import { Button } from "bootstrap";


// import TaskCard from "./Tasks/TaskCard";

const ResultCard = ({ id, comment, media, note, status, student, task, updated  }) => {


  const { taskMedia, findTask } = useContext(FireDataContext);


  

const { coach, name, type, start, end, notes } = findTask(task);

// const task = findTask();

const icon = ItemIconNames.find((item) => item.name === type);
const calendarIcon = ItemIconNames.find((item) => item.name === "calendar");
const coachIcon = ItemIconNames.find((item) => item.name === "coach");
//   const isoDate = end.toDate().toDateString();
const isoDate = end.toDate().toISOString();
const d = new Date(isoDate).toLocaleDateString("en-GB");

const updateDate = new Date(updated.toDate().toISOString()).toLocaleDateString("en-GB");


  return (
    <Card key={id}>
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        {/* <CardSubtitle tag="h6" className="mb-2 text-muted"></CardSubtitle> */}
        <Row>
          <Col lg="4" className="text-center">
            <span className="fa-5x ">
              {icon ? icon.faIcon : <FontAwesomeIcon icon={faTshirt} />}
            </span>
          </Col>
          <Col
            lg="8"
            className="text-left p-lg-3 mb-2"
            style={{ overflowX: "auto" }}
          >
            <Table borderless>
              <tbody>
                <tr>
                  <th className="text-center" scope="row">
                    {coachIcon.faIcon}
                  </th>
                  <td>{coach}</td>
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
          <ResultSent media={media}/>


          Result sent


          {/* data modyfikacji */}
{/* pliki */}
        </CardText>
        <CardText>
          <Uploader cardId={id} />
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
