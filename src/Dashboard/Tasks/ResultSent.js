import { Button, UncontrolledCollapse } from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";

import { FireDataContext } from "../../Authorization/FireDataContext";
import { FireDataProvider } from "../../Authorization/FireDataContext";

import React, {
  useState,
  useCallback,
  useContext,
} from "react";

const ResultSent = (props) => {
  const cardId = `resultSentToggler-${props.id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  const { taskMedia } = useContext(FireDataContext);

  return (
    <div>
      <Button id={cardId} size="lg" block>
        {downIcon.faIcon}
        Przesłane wyniki
      </Button>
      {taskMedia(props.id)}
      <UncontrolledCollapse toggler={"#" + cardId}>
      kk
      </UncontrolledCollapse>
    </div>
  );
};

export default ResultSent;
