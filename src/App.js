import "./App.css";

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

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

import Viewer from "./Dashboard/Panel";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  const [user] = useAuthState(auth);
  const videosRef = firestore.collection("videos");
  const [videos] = useCollectionData(videosRef, { idField: "id" });

  const [downloables, setDownloables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDownloableURLs() {
      let downloables = [];
      const promises = videos.map(async ({ url }) => {
        await retrieveDownloadUrl(url).then((result) =>
          downloables.push(result)
        );
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
    <div className="App conta">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
          path="/dashboard"
          component={() => (
            <Viewer
              downloables={downloables}
              isLoading={isLoading}
              setDownloables={setDownloables}
              setIsLoading={setIsLoading}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
