import React from "react";
import ReactPlayer from "react-player";
import { Spinner } from "reactstrap";
import Uploader from "./Uploader/Uploader.js";

const spinnerGroup = (
  <div>
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
  </div>
);

function Viewer(props) {
  return (
    <div>
      <Uploader/>
      <h2>Sent Documents</h2>
      {props.isLoading
        ? spinnerGroup
        : props.downloables.map((URL) => (
            <ReactPlayer url={URL} width="40%" height="40%" controls={true} />
          ))}
    </div>
  );
}

export default Viewer;
