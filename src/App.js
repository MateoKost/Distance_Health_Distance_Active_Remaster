import logo from "./logo.svg";
import "./App.css";

import ReactPlayer from "react-player";
import Player from "./Features/Player/Player.js";
import React, { useEffect, useRef, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  auth,
  firestore,
  signInWithGoogle,
  uploadFile,
  showFile,
  retrieveDownloadUrl,
} from "./base";

import Viewer from "./Panel";

function App() {
  const [videoFilePath, setVideoFileURL] = useState([]);
  const [user] = useAuthState(auth);
  const videosRef = firestore.collection("videos");
  const [videos] = useCollectionData(videosRef, { idField: "id" });

  const [downloables, setDownloables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const enterFile = (file) => {
    uploadFile(file, setVideoFileURL, videosRef);
  };

  useEffect(() => {
    async function fetchDownloableURLs() {
      let downloables = [];
      const promises = videos.map(async ({ url }) => {
        await retrieveDownloadUrl(url).then((result) => downloables.push(result));
      });
      await Promise.all(promises)
        .then(() => setDownloables(downloables))
        .then(() => {
          setIsLoading(false);
        });
    }
    videos && fetchDownloableURLs();
  }, [videos]);

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <Player uploadFile={enterFile} />
      <button onClick={() => console.log(videos)}>Kliknij</button>

      <Viewer
        downloables={downloables}
        isLoading={isLoading}
        setDownloables={setDownloables}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;
