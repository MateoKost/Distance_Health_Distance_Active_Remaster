import ReactPlayer from "react-player";
import React, { useState } from "react";
import {
  uploadFile
} from "../../base";

import DragAndDrop from "./DragAndDrop";

import { Button, Card, CardBody, CardText, CardHeader} from 'reactstrap';

import { UncontrolledCollapse } from 'reactstrap';

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

       {/* <Button color="info"onClick={()=>console.log(reg.test(videoFile[0].file.type))} >Prześlij</Button> */}

         {/* <input type="file" id="file" multiple onChange={handleVideoUpload}/> */}

<Button id="toggler">Dodaj wyniki</Button>
<UncontrolledCollapse toggler="#toggler">
         <Card>
        <CardHeader>Prześlij plik</CardHeader>
   
        <CardBody>
          {/* <CardTitle tag="h5">Special Title Treatment</CardTitle> */}
          <CardText>
          <DragAndDrop setFiles={setVideoFile}/>
            </CardText>
            <Button color="info"onClick={handleEnterUpload} >Prześlij</Button>
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
