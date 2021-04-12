import React, { useContext } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import ItemIconNames from "../../Utilities/IconNames";
import Uploader from "../Uploader/Uploader.js";
import DetailsExpand from "./DetailsExpand";
import ResultSent from "./ResultSent";
import { FireDataContext } from "../../FireData/FireDataContext";
import { AuthContext } from "../../Authorization/Auth.js";

const ResultCard = ({
  id,
  comment,
  media,
  note,
  status,
  student,
  task,
  updated,
}) => {
  const { findTask, updateResult } = useContext(FireDataContext);

  const { coach, name, type, start, end, notes } = findTask(task);

  const icon = ItemIconNames.find((item) => item.name === type);
  const calendarIcon = ItemIconNames.find((item) => item.name === "calendar");
  const coachIcon = ItemIconNames.find((item) => item.name === "coach");
  const starIcon = ItemIconNames.find((item) => item.name === "star");

  const endDate = new Date(end.toDate().toISOString()).toLocaleDateString(
    "en-GB"
  );
  const updateDate = new Date(
    updated.toDate().toISOString()
  ).toLocaleDateString("en-GB");
  const updateHour = new Date(updated.toDate().toISOString())
    .toTimeString()
    .substr(0, 5);

  const { allowStudent, allowCoach } = useContext(AuthContext);

  return (
    <Card key={id}>
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
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
                  <td>{endDate}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <CardText>
          <DetailsExpand id={id} notes={notes} />
        </CardText>
        <CardText>
          <p className="text-left">
            Data modyfikacji: {updateDate} {updateHour}
          </p>
          <ResultSent id={id} media={media} />

          {allowStudent() && (
            <Uploader cardId={id} task={task} uploadMethod={updateResult} />
          )}
          {allowCoach() && (
            <Button color="danger" className="orange" disabled block>
              {starIcon.faIcon} Oceń
            </Button>
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default ResultCard;
