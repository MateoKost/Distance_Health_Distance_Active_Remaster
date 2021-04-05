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

function Uploader({cardId, task, uploadMethod}) {
  const [files, setFiles] = useState([]);
  const [filesOk, setFilesOK] = useState(false);
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
  //   setFilesOK(true);
  //   setFiles(outcome)
  // };

  // const enterFile = (file) => {

    // useEffect(() => {

    //   files[0] !==null && setFilesOK(true)
    //   // files && setFilesOK(true)
  
  
    // }, [setFiles]);

  //   // uploadFile(file, setVideoFileURL);
  // };

  const handleEnterUpload = () => {
    // console.log("handleEnterUpload");
    // console.log(files);
    // console.log(task);
    // console.log(cardId);
    // files && uploadMethod(files, task, cardId)
    files && createResult(files, task)
    // for (let file of files) {
    //   console.log(file);
    //   uploadFile(file);
    // }
  };
  

  const toggleId=`toggler-${cardId}`

  const icon = ItemIconNames.find((item) => item.name === "add");

  return (
    <div>
      {/* <h2>Prześlij plik</h2> */}
      {/* {/* {file.type === "image/.*"} */}

      {/* <Button onClick={()=>setFilesOK(true)} >Abcd</Button> */}

      {/* <input type="file" id="file" multiple onChange={handleVideoUpload}/> */}

      <Button id={toggleId} size="lg" block>


       {icon ? icon.faIcon : <FontAwesomeIcon icon={faChair} />} {" "}

        {/* <FontAwesomeIcon icon={faLongArrowAltUp} className="fa-lg" /> */}
        Dodaj wyniki
      </Button>
      <UncontrolledCollapse toggler={"#"+toggleId}>
        <Card>
          {/* <CardHeader>Prześlij plik</CardHeader> */}

          <CardBody>
            {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
            <CardText>
              <DragAndDrop setFiles={setFiles} setFilesOK={setFilesOK}/>
            </CardText>

            <Button
              color="info"
              onClick={handleEnterUpload}
              disabled={!filesOk}
            >
              Prześlij
            </Button>


            {/* {filesOk ? (            <Button
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
      {filesOk &&
        files.map((file) => (
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
