import { Button, UncontrolledCollapse, CardColumns, CardText } from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";

import { FireDataContext } from "../../Authorization/FireDataContext";
// import { FireDataProvider } from "../../Authorization/FireDataContext";
import ReactPlayer from "react-player";
import React, {
  useState,
  useCallback,
  useContext,useEffect
} from "react";

const ResultSent = (props) => {
  const cardId = `resultSentToggler-${props.id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  const [downloables, setDownloables] = useState([]);
  const [downloablesPending, setDownloablesPending] = useState(true);
  
  const { taskMedia, resultsPending } = useContext(FireDataContext);


  useEffect(() => {

    (props.media && downloablesPending) && taskMedia(props.media, setDownloables, setDownloablesPending)


  }, []);

  return (
    <div>
      <p>Data modyfikacji</p>
      <Button id={cardId} size="lg" block>
        {downIcon.faIcon}
        Przesłane wyniki
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
      {/* {(props.media && downloablesPending) && taskMedia(props.media, setDownloables, setDownloablesPending)} */}
      {/* {!downloablesPending && console.log(downloables)} */}
      {/* <CardColumns className="m-2">  */}

     { !downloablesPending && downloables.map((url) => 
       
      //  console.log(url);
      //  key={     url.split('token=')[1]} 
     (

<article>
<ReactPlayer
            url={url}
            width="100%"
            height="100%"
            controls={true}
          />
</article>
         
        ))
     }

{/* </CardColumns> */}
      </UncontrolledCollapse>
    </div>
  );
};

export default ResultSent;
