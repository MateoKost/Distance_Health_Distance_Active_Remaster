import React, { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import { Button,Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair } from "@fortawesome/free-solid-svg-icons";
import ItemIconNames from "../../Utilities/IconNames";

function Uploader({ cardId, task, uploadMethod }) {
  const [files, setFiles] = useState([]);
  const [filesOk, setFilesOK] = useState(false);
  const [uploaderModal, toggleUploaderModal] = useState(false);

  const handleEnterUpload = () => {
    toggleUploaderModal(false)
    files && uploadMethod(files, task, cardId);
  };

  const toggleId = `toggler-${cardId}`;
  const icon = ItemIconNames.find((item) => item.name === "add");

  return (
    <div>
      <Button id={toggleId}  block onClick={()=>toggleUploaderModal(true)} color="danger" className="orange">
        {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />} Dodaj wyniki
      </Button>
      <Modal isOpen={uploaderModal} >
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }} toggle={()=>toggleUploaderModal(false)}>
          Prześlij wynik
        </ModalHeader>
        <ModalBody>
        <DragAndDrop setFiles={setFiles} setFilesOK={setFilesOK} />
        </ModalBody>
        <ModalFooter>
        <Button
              color="danger" className="orange"
              onClick={handleEnterUpload}
              disabled={!filesOk}
            >
              Prześlij
            </Button>
          <Button color="secondary" 
          onClick={()=>toggleUploaderModal(false)}
          >
            Anuluj
          </Button>

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Uploader;
