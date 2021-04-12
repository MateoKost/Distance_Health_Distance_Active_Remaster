import React, { useState, useContext } from "react";
import { firestore, storage } from "../base.js";
import { useEffect} from "react";
import { AuthContext } from "../Authorization/Auth.js";

export const FireDataContext = React.createContext();

const storageRef = storage.ref();

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

  const tasksRef = firestore.collection("tasks");
  const [tasks, setTasks] = useState([]);
  const [tasksPending, setTasksPending] = useState(true);

  const resultsRef = firestore.collection("results");
  const [results, setResults] = useState([]);
  const [resultsPending, setResultsPending] = useState(true);

  const [isResultModalActive, setResultModalActive] = useState(false);
  const [isResultSent , setResultSent ] = useState(false);

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


async function createTask(data, setNewTaskModal){
  try {
    tasksRef
      .add({  ...data,  coach: currentUser.email,
      })
      .then((result) => {
        if (result.id !== null) {
          setAlertVisibility(true);
          setNewTaskModal(false);
        }
      });
    // history.push("/");
  } catch (error) {
    alert(error);
  }
}


  async function createResult(files, taskId) {
    // console.log("createResult");
    // console.log(files);
    // console.log(taskId);

    setResultModalActive(true);

    let mediaChildPaths = [];

    async function uploadFile(file) {

      const childPath = "Videos/" + file.name;
      const fileRef = storageRef.child(childPath);

      try {
        console.log("uploadFile");
      await  fileRef.put(file).then(() => {
       
        mediaChildPaths.push(childPath);
        console.log("Uploaded a file");
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
        .then(() => {console.log("added result"); setResultSent(true);setResultModalActive(false)});
    });

  }

  async function updateResult(files, taskId, cardId) {
    // console.log("createResult");
    // console.log(files);
    // console.log(taskId);

    setResultModalActive(true);

    let mediaChildPaths = [];

    async function uploadFile(file) {

      const childPath = "Videos/" + file.name;
      const fileRef = storageRef.child(childPath);

      try {
        console.log("uploadFile");
      await  fileRef.put(file).then(() => {
       
        mediaChildPaths.push(childPath);
        console.log("Uploaded a file");
      });
      } catch (error) {
        alert(error);
      }
    }

    let oldResult;
    try{
      await resultsRef.doc(cardId).get().then((doc)=> oldResult = { id: doc.id, ...doc.data() } );
    } catch(error) {
      alert(error);
    }



    const promises = await files.map((file) => uploadFile(file));

    Promise.all(promises).then(() => {
      console.log("promise");
      resultsRef.doc(cardId).set({
        media: [...oldResult.media, ...mediaChildPaths],
        updated: new Date(),
      }, { merge: true }).then(() => {console.log("updated result"); setResultSent(true);setResultModalActive(false)});
    });

  }


  useEffect(() => {
    async function fetchTasks() {
      let documents = [];

      const snapshot = await tasksRef
        // .where("student", "==", currentUser.uid)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      } else {
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });

          Promise.all(documents)
            .then(() => {
              setTasks(documents);
            })
            .then(() => {
              setTasksPending(false);
            });
        });
        return documents;
      }
    }

    async function fetchResults() {
      let documents = [];

      const snapshot = await resultsRef
        // .where("student", "==", currentUser.uid)
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      } else {
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });

          Promise.all(documents)
            .then(() => {
              setResults(documents);
            })
            .then(() => {
              setResultsPending(false);
            });
        });
        return documents;
      }
    }

    async function fetchClasses() {
      let documents = [];

      const snapshot = await classesRef

        .where("students", "array-contains", currentUser.email)
        .get();

      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      } else {
        snapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
        });

        Promise.all(documents)
          .then(() => {
            setClasses(documents);
          })
          .then(() => {
            setClassesPending(false);
          });
      }
    }

    fetchTasks();
    fetchResults();
    fetchClasses();
  }, []);

  return (
    <FireDataContext.Provider
      value={{
        tasksRef,
        tasks,
        tasksPending,

        resultsRef,
        results,
        resultsPending,

        classesRef,
        classes,
        classesPending,

        findTask,
        createTask,
        taskMedia,
        createResult,
        updateResult,

        isResultModalActive,
        isResultSent,

        setAlertVisibility,
        alertVisibility
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
