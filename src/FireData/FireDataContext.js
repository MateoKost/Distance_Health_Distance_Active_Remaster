import React, { useState, useContext } from "react";
import { firestore } from "../base.js";
import { useEffect } from "react";
import { AuthContext } from "../Authorization/Auth.js";
import { fetchData, taskMedia } from "./FileFunctions.js";
import { ResultsProvider } from './ResultsContext';
import { TasksProvider } from './TasksContext';

export const FireDataContext = React.createContext();

export const FireDataProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  //classes
  const classesRef = firestore.collection("classes");
  const [classes, setClasses] = useState([]);
  const [classesPending, setClassesPending] = useState(true);

  useEffect(() => {
    fetchData({
      ref: classesRef,
      query: {
        fieldPath: "students",
        opStr: "array-contains",
        value: currentUser.email,
      },
      dataSetter: setClasses,
      pendingSetter: setClassesPending,
    });
  }, []);

  return (
    
   
    <FireDataContext.Provider
      value={{
        classes,
        classesPending,
        taskMedia,
      }}
    >
         <ResultsProvider>
      <TasksProvider>
      {children}
      </TasksProvider>
      </ResultsProvider>
    </FireDataContext.Provider>

  );
};
