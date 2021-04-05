import { Button, Table, UncontrolledCollapse } from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";

const DetailsExpand = (props) => {
  const cardId = `detailsToggler-${props.id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  return (
    <div>
      <Button id={cardId} outline color="secondary" className="text-left" size="lg" block >
      <span class="text-left">
      <span class="expander">
      {downIcon.faIcon}
      </span>
        Szczegóły
        </span>
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
        <Table>
          <thead>
            <tr>
              <th>Ocena</th>
              <th>Rygor</th>
            </tr>
          </thead>
          <tbody>
            {["B", "C", "D"].map((ch) => (
              <tr>
                <th className="text-center" scope="row">
                  {ch}
                </th>
                <td>{props.notes[`${ch}`]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </UncontrolledCollapse>
    </div>
  );
};

export default DetailsExpand;
