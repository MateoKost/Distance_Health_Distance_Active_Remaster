import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  UncontrolledCollapse,
} from "reactstrap";
import ItemIconNames from "../../Utilities/IconNames";
import { FireDataContext } from "../../FireData/FireDataContext";
import ReactPlayer from "react-player";
import { thumbsContainer, thumb, thumbInner, img } from "../Uploader/Style";
import "./Task.css";
import "../../App.css"

const regVideo = new RegExp("^(video/.*)$");
const regImg = new RegExp("^(image/.*)$");

const ResultSent = ({ id, media }) => {
  const cardId = `resultSentToggler-${id}`;
  const downIcon = ItemIconNames.find((item) => item.name === "down");

  const [downloables, setDownloables] = useState([]);
  const [downloablesPending, setDownloablesPending] = useState(true);

  const { taskMedia } = useContext(FireDataContext);

  useEffect(() => {
    media &&
      downloablesPending &&
      taskMedia(media, setDownloables, setDownloablesPending);
  }, []);

  return (
    <div>
      <Button id={cardId}  block outline>
        {downIcon.faIcon}
        Przesłane wyniki
      </Button>
      <UncontrolledCollapse toggler={"#" + cardId}>
        <section className="container">
          <aside style={thumbsContainer}>
            {!downloablesPending &&
              downloables.map(({ contentType, downloadURL }) => (
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
