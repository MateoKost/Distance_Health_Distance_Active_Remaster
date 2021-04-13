import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { React, useContext } from "react";
import { withRouter } from "react-router";
import { ResultsContext } from "../../FireData/ResultsContext";
import SpinnerGroup from "../../Utilities/SpinnerGroup";
import "./Task.css";
import "../../App.css";

const LoadingModal = () => {
  const { isResultModalActive, isResultSent } = useContext(ResultsContext);

  isResultSent && window.location.reload();
  
  return (
    <div>
      <Modal isOpen={isResultModalActive}>
        <ModalHeader cssModule={{ "modal-title": "w-100 text-center" }}>
          Trwa przesyłanie wyników
        </ModalHeader>
        <ModalBody className="gridCenter">
          <SpinnerGroup />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => window.location.reload()}>
            Przerwij
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default withRouter(LoadingModal);
