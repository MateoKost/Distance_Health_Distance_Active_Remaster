import ReactPlayer from "react-player";
import React, { useState } from "react";

function Player(props) {
  const [videoFile, setVideoFile] = useState([]);
  const [videoOK, setVideoOK] = useState(false);

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

  const handleEnterUpload = () => {
    for (let file of videoFile) {
      console.log(file);
      props.uploadFile(file.file);
    }
  };

  return (
    <div>

      {videoOK &&
        videoFile.map((file) => (
          <ReactPlayer
            url={file.url}
            width="40%"
            height="40%"
            controls={true}
          />
        ))}
    </div>
  );
}

export default Player;
