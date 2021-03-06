import React, { useEffect, useContext } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Table,CardHeader,Button 
} from "reactstrap";
import Uploader from "../Uploader/Uploader.js";
import ItemIconNames from "../../Utilities/IconNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTshirt } from "@fortawesome/free-solid-svg-icons";
import DetailsExpand from "./DetailsExpand";
import { AuthContext } from "../../Authorization/Auth.js";
import { ResultsContext } from "../../FireData/ResultsContext";

const TaskCard = ({ id, coach, name, type, status, start, end, notes }) => {
  const icon = ItemIconNames.find((item) => item.name === type);
  const calendarIcon = ItemIconNames.find((item) => item.name === "calendar");
  const coachIcon = ItemIconNames.find((item) => item.name === "coach");

  const editIcon = ItemIconNames.find((item) => item.name === "edit");
  const deleteIcon = ItemIconNames.find((item) => item.name === "delete");
  
  const endDate = new Date(end.toDate().toISOString()).toLocaleDateString(
    "en-GB"
  );
  const { createResult } = useContext(ResultsContext);
  const { allowStudent, allowCoach } = useContext(AuthContext);

  return (
    <Card key={id}>
             {allowCoach()  && (
      <CardHeader className="text-right">
      <Button outline disabled >{editIcon.faIcon}</Button> {" "}
      <Button outline disabled color="danger">{deleteIcon.faIcon}</Button> 
      </CardHeader>
      ) }
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
          {allowStudent() && (
            <Uploader cardId={id} task={id} uploadMethod={createResult} />
          )}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
