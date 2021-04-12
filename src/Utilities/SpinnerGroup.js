import React from "react";
import { Spinner } from "reactstrap";

const SpinnerGroup = () =>{
  return(
    <div>
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="info" />
      <Spinner type="grow" color="info" />
    </div>
  )
};

export default SpinnerGroup; 