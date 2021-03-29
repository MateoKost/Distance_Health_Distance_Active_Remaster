import { Button, UncontrolledCollapse } from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";

const ResultSent = (props) => {
  const cardId = `resultSentToggler-${props.id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  return (
    <div>
      <Button id={cardId} size="lg" block>
        {downIcon.faIcon}
        Przesłane wyniki
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
      kk
      </UncontrolledCollapse>
    </div>
  );
};

export default ResultSent;
