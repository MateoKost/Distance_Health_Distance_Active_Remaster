import React, { useState, useContext } from "react";
import { firestore, storage, auth } from "../base.js";
import { useEffect, useCollectionData } from "react";
// import { retrieveDownloadUrl } from "../base.js";

import { AuthContext, AuthProvider } from "../Authorization/Auth.js";

export const FireDataContext = React.createContext();

const storageRef = storage.ref();

const retrieveDownloadUrl = async (url) => {
  const fileRef = storageRef.child(url);
  let contentType;
  await fileRef.getMetadata().then((result)=>contentType=result.contentType);
  const downloadURL = await fileRef.getDownloadURL();
  return {contentType: contentType, downloadURL:downloadURL }
};

export const FireDataProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  const tasksRef = firestore.collection("tasks");
  const [tasks, setTasks] = useState([]);
  const [tasksPending, setTasksPending] = useState(true);

  const resultsRef = firestore.collection("results");
  const [results, setResults] = useState([]);
  const [resultsPending, setResultsPending] = useState(true);

  const classesRef = firestore.collection("classes");
  const [classes, setClasses] = useState([]);
  const [classesPending, setClassesPending] = useState(true);

  function taskMedia(media, setDownloables, setDownloablesPending) {
    async function fetchDownloableURLs() {
      let downloables = [];
      const promises = media.map(async (url) => {
        await retrieveDownloadUrl(url).then((result) =>{
          downloables.push(result)
        }
          
        );
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


  async function createResult(files, taskId) {

    let mediaChildPaths = [];

     async function uploadFile(file) {
      const childPath = "Videos/" + file.name;
      const fileRef = storageRef.child(childPath);

      // try {
     await fileRef.put(file).then(() => {
        mediaChildPaths.push(childPath);
        console.log("Uploaded a file");
      });
    // } catch (error) {
    //   alert(error);
    // }

    }

    // async function uploadFiles(){
      const promises = await files.map( (file) => uploadFile(file));
      Promise.all(promises)
      .then(() => {
        resultsRef.add({
          media: mediaChildPaths,
          note: "",
          comment: "",
          status: "finished",
          student:currentUser.email,
          task: taskId,
          updated: new Date(),
        }).then(()=>console.log("added result"))

        //  registerFiles();
      })
      // return mediaChildPaths;
    // }


//     async function registerFiles() {
//       try {
// await 
        // resultsRef.add({
        //   media: mediaChildPaths,
        //   note: "",
        //   comment: "",
        //   status: "finished",
        //   student:currentUser.email,
        //   task: taskId,
        //   updated: new Date(),
        // }).then(()=>console.log("added result"))


      // } catch (error) {
      //   alert(error);
      // }


    


      // await videosRef
      //   .add({
      //     url: childPath,
      //     user: "user123",
      //   })
      //   .then(() => console.log("Registry updated"));
    
      // await fileRef.getDownloadURL().then((result) => {
      //   setVideoFileURL(result);
      // });
    // }
    // registerFiles();
    // uploadFiles()
    
    
  }

  function updateResult(){
    
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
        taskMedia,
        createResult,
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
