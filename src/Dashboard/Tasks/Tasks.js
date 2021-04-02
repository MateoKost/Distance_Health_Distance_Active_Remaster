import React, { useState, useContext } from "react";
import ItemIconNames from "../../Utilities/IconNames";
import SpinnerGroup from "../../Utilities/SpinnerGroup";

import { CardColumns, Button, Collapse } from "reactstrap";

const Tasks = (props) => {
  const [isOpen, setIsOpen] = useState(props.state);
  const downIcon = ItemIconNames.find((item) => item.name === "down");
  const rightIcon = ItemIconNames.find((item) => item.name === "right");
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Button onClick={toggle} className="text-left" size="lg" block>
        {isOpen ? (
          downIcon.faIcon
        ) : (
          <span>
            {"   "}
            {rightIcon.faIcon}
            {"   "}{" "}
          </span>
        )}{" "}
        {props.label}
      </Button>
      <Collapse isOpen={isOpen}>
        <CardColumns className="m-2">
          {props.tasks.pending ? (
            <SpinnerGroup />
          ) : (
            props.tasks.tasks
          )}
        </CardColumns>
      </Collapse>
    </div>
  );
};

export default Tasks;
