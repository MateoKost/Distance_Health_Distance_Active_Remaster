import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore, uploadFile, showFile, retrieveDownloadUrl } from "./base";
import { AuthProvider } from "./Authorization/Auth";
import PrivateRoute from "./Authorization/PrivateRoute";
import Viewer from "./Dashboard/Panel";
import LandingPage from "./LandingPage/LandingPage";

import "./App.css";

function App() {

  return (
    <div className="App conta">
      <AuthProvider>
        <Router>
          <div>
            <Route exact path="/" component={LandingPage} />
            <PrivateRoute
              exact
              path="/dashboard"
              component={() => (
                <Viewer
                  // downloables={downloables}
                  // isLoading={isLoading}
                  // setDownloables={setDownloables}
                  // setIsLoading={setIsLoading}
                />
              )}
            />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
