import ReactPlayer from "react-player";
import React, { useState, useRef,useContext, useEffect } from "react";
// import { uploadFile } from "../../base";

import DragAndDrop from "./DragAndDrop";

import { Button, Card, CardBody, CardText, CardHeader, } from "reactstrap";

import { UncontrolledCollapse } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltUp,faChair } from "@fortawesome/free-solid-svg-icons";

import { FireDataContext } from "../../Authorization/FireDataContext";



import ItemIconNames from "../../Utilities/IconNames";
// import SpinnerGroup from '../../Utilities/SpinnerGroup';

function Uploader(props) {
  const [videoFile, setVideoFile] = useState([]);
  const [videoOK, setVideoOK] = useState(false);
  // const [videoFileURL, setVideoFileURL] = useState([]);

  const { createResult } = useContext(FireDataContext);


  // const handleVideoUpload = (event) => {
  //   let outcome = [];
  //   for (let file of event.target.files) {
  //     outcome.push({
  //       url: URL.createObjectURL(file),
  //       file: file,
  //     });
  //   }
  //   setVideoOK(true);
  //   setVideoFile(outcome)
  // };

  // const enterFile = (file) => {

    // useEffect(() => {

    //   videoFile[0] !==null && setVideoOK(true)
    //   // videoFile && setVideoOK(true)
  
  
    // }, [setVideoFile]);

  //   // uploadFile(file, setVideoFileURL);
  // };

  const handleEnterUpload = () => {
    videoFile && createResult(videoFile, props.task)
    // for (let file of videoFile) {
    //   console.log(file);
    //   uploadFile(file);
    // }
  };
  

  const cardId=`toggler-${props.cardId}`

  const icon = ItemIconNames.find((item) => item.name === "add");

  return (
    <div>
      {/* <h2>Prześlij plik</h2> */}
      {/* {/* {file.type === "image/.*"} */}

      {/* <Button onClick={()=>setVideoOK(true)} >Abcd</Button> */}

      {/* <input type="file" id="file" multiple onChange={handleVideoUpload}/> */}

      <Button id={cardId} size="lg" block>


       {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />} {" "}

        {/* <FontAwesomeIcon icon={faLongArrowAltUp} className="fa-lg" /> */}
        Dodaj wyniki
      </Button>
      <UncontrolledCollapse toggler={"#"+cardId}>
        <Card>
          {/* <CardHeader>Prześlij plik</CardHeader> */}

          <CardBody>
            {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
            <CardText>
              <DragAndDrop setFiles={setVideoFile} setVideoOK={setVideoOK}/>
            </CardText>

            <Button
              color="info"
              onClick={handleEnterUpload}
              disabled={!videoOK}
            >
              Prześlij
            </Button>


            {/* {videoOK ? (            <Button
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
            </Button>)} */}


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
