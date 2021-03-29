import React from "react";
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

const TaskCard = ({ id, coach, name, type, status, start, end, notes }) => {
  const icon = ItemIconNames.find((item) => item.name === type);
  const calendarIcon = ItemIconNames.find((item) => item.name === "calendar");
  const coachIcon = ItemIconNames.find((item) => item.name === "coach");
  //   const isoDate = end.toDate().toDateString();
  const isoDate = end.toDate().toISOString();
  const d = new Date(isoDate).toLocaleDateString("en-GB");

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
          <ResultSent id={id} notes={notes} />
        </CardText>
        <CardText>
          <Uploader cardId={id} />
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
