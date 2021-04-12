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

import { FireDataProvider } from "./Authorization/FireDataContext";
import { FireDataContext } from "./Authorization/FireDataContext";
import NavMenu from "./NavMenu/NavMenu";

import { ModalProvider } from "./Modals/ModalContext";

function App() {

  return (
    <div className="container-fluid p-0" >
      <AuthProvider>
        <Router>
          <div>
          <ModalProvider>
            <NavMenu/>
            <Route exact path="/" component={LandingPage} />
          </ModalProvider>
            <PrivateRoute
              exact
              path="/dashboard"
              component={() => (
                <FireDataProvider>
                <Viewer/>
                </FireDataProvider>
              )}
            />
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
