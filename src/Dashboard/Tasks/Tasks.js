import React, { useState } from "react";
import ItemIconNames from "../../Utilities/IconNames";
import SpinnerGroup from '../../Utilities/SpinnerGroup';
import TaskCard from './TaskCard';
import {
    Spinner,
    CardColumns,
    CardDeck,
    UncontrolledCollapse,
    Button,
    Collapse,Card,CardBody
  } from "reactstrap";

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
                  
          {/* <UncontrolledCollapse toggler="pendingToggler" isOpen={true}> */}
          <CardColumns className="m-2">
         
            {props.tasks.tasksPending
              ? (<SpinnerGroup/>)
              : props.tasks.tasks.map(TaskCard)}
           
          </CardColumns>
  
          {/* </UncontrolledCollapse> */}
        </Collapse>
      </div>
    );
  };


 export default Tasks;