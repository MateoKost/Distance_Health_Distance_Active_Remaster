import React, { useState, useContext } from "react";
import { firestore } from "../base.js";
import { useEffect } from "react";
import { AuthContext } from "../Authorization/Auth.js";
import { fetchData, uploadFile, taskMedia } from "./FileFunctions.js";

export const ResultsContext = React.createContext();

export const ResultsProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  //results
  const resultsRef = firestore.collection("results");
  const [results, setResults] = useState([]);
  const [resultsPending, setResultsPending] = useState(true);
  const [isResultModalActive, setResultModalActive] = useState(false);
  const [isResultSent, setResultSent] = useState(false);

  async function createResult(files, taskId) {
    setResultModalActive(true);

    let mediaChildPaths = [];
    const promises = await files.map((file) =>
      uploadFile(file, mediaChildPaths)
    );

    Promise.all(promises).then(() => {
      console.log("promise");
      resultsRef
        .add({
          media: mediaChildPaths,
          note: "",
          comment: "",
          status: "finished",
          student: currentUser.email,
          task: taskId,
          updated: new Date(),
        })
        .then(() => {
          console.log("added result");
          setResultSent(true);
          setResultModalActive(false);
        });
    });
  }

  async function updateResult(files, taskId, cardId) {
    setResultModalActive(true);
    let mediaChildPaths = [];
    let oldResult;
    try {
      await resultsRef
        .doc(cardId)
        .get()
        .then((doc) => (oldResult = { id: doc.id, ...doc.data() }));
    } catch (error) {
      alert(error);
    }

    const promises = await files.map((file) =>
      uploadFile(file, mediaChildPaths)
    );

    Promise.all(promises).then(() => {
      console.log("promise");
      resultsRef
        .doc(cardId)
        .set(
          {
            media: [...oldResult.media, ...mediaChildPaths],
            updated: new Date(),
          },
          { merge: true }
        )
        .then(() => {
          console.log("updated result");
          setResultSent(true);
          setResultModalActive(false);
        });
    });
  }

  useEffect(() => {
    fetchData({
      ref: resultsRef,
      dataSetter: setResults,
      pendingSetter: setResultsPending,
    });
  }, []);

  return (
    <ResultsContext.Provider
      value={{
        isResultModalActive,
        isResultSent,
        results,
        resultsPending,
        createResult,
        updateResult,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
