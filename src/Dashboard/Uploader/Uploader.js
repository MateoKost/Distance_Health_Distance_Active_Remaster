import ReactPlayer from "react-player";
import React, { useState, useRef } from "react";
import { uploadFile } from "../../base";

import DragAndDrop from "./DragAndDrop";

import { Button, Card, CardBody, CardText, CardHeader } from "reactstrap";

import { UncontrolledCollapse } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";

function Uploader(props) {
  const [videoFile, setVideoFile] = useState([]);
  const [videoOK, setVideoOK] = useState(false);
  const [videoFileURL, setVideoFileURL] = useState([]);

  const handleVideoUpload = (event) => {
    let outcome = [];
    for (let file of event.target.files) {
      outcome.push({
        url: URL.createObjectURL(file),
        file: file,
      });
    }
    setVideoFile(outcome);
    setVideoOK(true);
  };

  const enterFile = (file) => {
    uploadFile(file, setVideoFileURL);
  };

  const handleEnterUpload = () => {
    for (let file of videoFile) {
      console.log(file);
      uploadFile(file);
    }
  };
  

  return (
    <div>
      {/* <h2>Prześlij plik</h2> */}
      {/* {/* {file.type === "image/.*"} */}

      {/* <Button onClick={()=>setVideoOK(true)} >Abcd</Button> */}

      {/* <input type="file" id="file" multiple onChange={handleVideoUpload}/> */}

      <Button id="toggler" size="lg" block>
        <FontAwesomeIcon icon={faLongArrowAltUp} className="fa-lg" />
        Dodaj wyniki
      </Button>
      <UncontrolledCollapse toggler="#toggler">
        <Card>
          <CardHeader>Prześlij plik</CardHeader>

          <CardBody>
            {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
            <CardText>
              <DragAndDrop setFiles={setVideoFile} />
            </CardText>

            {videoOK ? (            <Button
              color="info"
              onClick={handleEnterUpload}
            >
              Prześlij
            </Button>) : (            <Button
              color="info"
              onClick={handleEnterUpload}
              disabled
            >
              Prześlij
            </Button>)}


          </CardBody>

          {/* <CardFooter>Footer</CardFooter> */}
        </Card>
      </UncontrolledCollapse>

      {/* 
      {videoOK &&
        videoFile.map((file) => (
          <ReactPlayer
            url={file.url}
            width="40%"
            height="40%"
            controls={true}
          />
        ))} */}
    </div>
  );
}

export default Uploader;
