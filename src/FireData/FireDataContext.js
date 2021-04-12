import React, { useState, useContext, useReducer } from "react";
import { firestore, storage } from "../base.js";
import { useEffect } from "react";
import { AuthContext } from "../Authorization/Auth.js";

export const FireDataContext = React.createContext();

const storageRef = storage.ref();

// const ACTIONS = {
//   ADD_TASK: 'add-task',
//   UPDATE_TASK: 'update-task',

//   ADD_RESULT: 'add-result',
//   UPDATE_RESULT: 'update-result',
// }

// function taskReducer(action)  {
//   switch (action.type){

//   }
// }

const retrieveDownloadUrl = async (url) => {
  const fileRef = storageRef.child(url);
  let contentType;
  await fileRef
    .getMetadata()
    .then((result) => (contentType = result.contentType));
  const downloadURL = await fileRef.getDownloadURL();
  return { contentType: contentType, downloadURL: downloadURL };
};

export const FireDataProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  //tasks
  const tasksRef = firestore.collection("tasks");
  const [tasks, setTasks] = useState([]);
  const [tasksPending, setTasksPending] = useState(true);

  //results
  const resultsRef = firestore.collection("results");
  const [results, setResults] = useState([]);
  const [resultsPending, setResultsPending] = useState(true);
  const [isResultModalActive, setResultModalActive] = useState(false);
  const [isResultSent, setResultSent] = useState(false);

  //classes
  const classesRef = firestore.collection("classes");
  const [classes, setClasses] = useState([]);
  const [classesPending, setClassesPending] = useState(true);

  const [alertVisibility, setAlertVisibility] = useState(false);

  function taskMedia(media, setDownloables, setDownloablesPending) {
    async function fetchDownloableURLs() {
      let downloables = [];
      const promises = media.map(async (url) => {
        await retrieveDownloadUrl(url).then((result) => {
          downloables.push(result);
        });
      });
      return await Promise.all(promises)
        .then(() => setDownloables(downloables))
        .then(() => setDownloablesPending(false));
    }

    media && fetchDownloableURLs();
  }

  function findTask(taskId) {
    return tasks.find((task) => task.id === taskId);
  }

  async function createTask(data, setNewTaskModal) {
    try {
      tasksRef.add({ ...data, coach: currentUser.email }).then((result) => {
        if (result.id !== null) {
          setAlertVisibility(true);
          setNewTaskModal(false);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  async function createResult(files, taskId) {
    setResultModalActive(true);

    let mediaChildPaths = [];

    async function uploadFile(file) {
      const childPath = "Videos/" + file.name;
      const fileRef = storageRef.child(childPath);

      try {
        await fileRef.put(file).then(() => {
          mediaChildPaths.push(childPath);
        });
      } catch (error) {
        alert(error);
      }
    }

    const promises = await files.map((file) => uploadFile(file));

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

    async function uploadFile(file) {
      const childPath = "Videos/" + file.name;
      const fileRef = storageRef.child(childPath);

      try {
        console.log("uploadFile");
        await fileRef.put(file).then(() => {
          mediaChildPaths.push(childPath);
          console.log("Uploaded a file");
        });
      } catch (error) {
        alert(error);
      }
    }

    let oldResult;
    try {
      await resultsRef
        .doc(cardId)
        .get()
        .then((doc) => (oldResult = { id: doc.id, ...doc.data() }));
    } catch (error) {
      alert(error);
    }

    const promises = await files.map((file) => uploadFile(file));

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
    async function fetchData({ ref, query, dataSetter, pendingSetter }) {
      let documents = [];
      const snapshot = query
        ? await ref.where(query.fieldPath, query.opStr, query.value).get()
        : await ref.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      } else {
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });

          Promise.all(documents)
            .then(() => {
              dataSetter(documents);
            })
            .then(() => {
              pendingSetter(false);
            });
        });
        return documents;
      }
    }

    fetchData({
      ref: tasksRef,
      dataSetter: setTasks,
      pendingSetter: setTasksPending,
    });
    fetchData({
      ref: resultsRef,
      dataSetter: setResults,
      pendingSetter: setResultsPending,
    });
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
        // ACTIONS,

        isResultModalActive,
        isResultSent,
        resultsRef,
        results,
        resultsPending,
        createResult,
        updateResult,

        classesRef,
        classes,
        classesPending,

        tasks,
        tasksPending,
        findTask,
        createTask,
        taskMedia,


        setAlertVisibility,
        alertVisibility,
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
