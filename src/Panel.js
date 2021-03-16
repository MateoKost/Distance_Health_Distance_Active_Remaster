import React from "react";
import ReactPlayer from "react-player";
import { Spinner } from "reactstrap";

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
      <h1>Sent Documents</h1>
      {props.isLoading
        ? spinnerGroup
        : props.downloables.map((URL) => (
            <ReactPlayer url={URL} width="40%" height="40%" controls={true} />
          ))}
    </div>
  );
}

export default Viewer;
