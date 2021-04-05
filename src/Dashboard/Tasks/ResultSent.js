import {
  Button,
  UncontrolledCollapse,
  CardColumns,
  CardText,
} from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";

import { FireDataContext } from "../../Authorization/FireDataContext";
// import { FireDataProvider } from "../../Authorization/FireDataContext";
import ReactPlayer from "react-player";
import React, { useState, useCallback, useContext, useEffect } from "react";

import {
  thumbsContainer,
  thumb,
  thumbInner,
  img,
} from "../Uploader/Style";

const regVideo = new RegExp("^(video/.*)$");
const regImg = new RegExp("^(image/.*)$");

const ResultSent = ({id,media}) => {
  const cardId = `resultSentToggler-${id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  const [downloables, setDownloables] = useState([]);
  const [downloablesPending, setDownloablesPending] = useState(true);

  const { taskMedia, resultsPending } = useContext(FireDataContext);

  useEffect(() => {
    media &&
      downloablesPending &&
      taskMedia(media, setDownloables, setDownloablesPending);
  }, []);

  return (
    <div>
      <Button id={cardId} size="lg" block>
        {downIcon.faIcon}
        Przesłane wyniki
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
        {/* {(props.media && downloablesPending) && taskMedia(props.media, setDownloables, setDownloablesPending)} */}
        {/* {!downloablesPending && console.log(downloables)} */}
        {/* <CardColumns className="m-2">  */}

        <section className="container">
          <aside style={thumbsContainer}>
            {!downloablesPending &&
              downloables.map(({ contentType, downloadURL }) => (
                //  console.log(url);
                //  key={     url.split('token=')[1]}

                <div style={thumb} key={downloadURL}>
                  <div style={thumbInner}>
                    {regVideo.test(contentType) ? (
                      <ReactPlayer
                        url={downloadURL}
                        width="100%"
                        height="100%"
                        controls={true}
                      />
                    ) : regImg.test(contentType) ? (
                      <img src={downloadURL} style={img} />
                    ) : (
                      "nieobslugiwany typ..."
                    )}
                  </div>
                </div>
              ))}
          </aside>
        </section>
      </UncontrolledCollapse>
    </div>
  );
};

export default ResultSent;
