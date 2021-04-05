import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { UncontrolledCollapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import ItemIconNames from "../../Utilities/IconNames";

function Uploader({ cardId, task, uploadMethod }) {
  const [files, setFiles] = useState([]);
  const [filesOk, setFilesOK] = useState(false);

  const handleEnterUpload = () => {
    files && uploadMethod(files, task, cardId);
  };

  const toggleId = `toggler-${cardId}`;
  const icon = ItemIconNames.find((item) => item.name === "add");

  return (
    <div>
      <Button id={toggleId} size="lg" block>
        {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />} Dodaj wyniki
      </Button>
      <UncontrolledCollapse toggler={"#" + toggleId}>
        <Card>
          <CardBody>
            <CardText>
              <DragAndDrop setFiles={setFiles} setFilesOK={setFilesOK} />
            </CardText>
            <Button
              color="info"
              onClick={handleEnterUpload}
              disabled={!filesOk}
            >
              Prześlij
            </Button>
          </CardBody>
        </Card>
      </UncontrolledCollapse>
    </div>
  );
}

export default Uploader;
