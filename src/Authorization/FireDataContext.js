import React, { useState, useContext } from "react";
import { firestore,storage,auth } from "../base.js";
import { useEffect, useCollectionData } from "react";
// import { retrieveDownloadUrl } from "../base.js";

import { AuthContext, AuthProvider } from "../Authorization/Auth.js";

export const FireDataContext = React.createContext();

const retrieveDownloadUrl  =  async(url) => {
  const storageRef = storage.ref();
  const fileRef = storageRef.child(url);
  return await fileRef.getDownloadURL();
}

export const FireDataProvider = ({ children }) => {
  // const videosRef = firestore.collection("videos");
  // const [videos] = useCollectionData(videosRef, { idField: "id" });

  // const [videos, setVideos] = useState([]);
  // const [AreVideosPending, setVideosPending] = useState(true);

  const { currentUser } = useContext(AuthContext);

  // const [downloables, setDownloables] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

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
    
    // const media = videos.filter()

    // const currentResult = results.find((result) => result.id === resultId);
    // alert(currentResult.id)




    // media && console.log(media[0])

    // media && console.log(retrieveDownloadUrl())

    // resultsPending ? console.log("pending") : console.log(media)
    // !resultsPending ? : {
      
    
    //  for( let medium of media ){
    //   !resultsPending & console.log(medium)
    // }

    // media.forEach((medium) => console.log(medium))

    // media && media.map((medium)=> console.log(retrieveDownloadUrl(medium)));




    async function fetchDownloableURLs() {
      let downloables = [];
      const promises = media.map(async ( url ) => { 
        await retrieveDownloadUrl(url).then((result) => downloables.push(result));
      });
      return  await Promise.all(promises).then(()=>setDownloables(downloables)).then(()=>setDownloablesPending(false))
      // return downloables;
    }

    media && fetchDownloableURLs()
    // return media.map((medium)=> console.log(medium));
    // return ("cześć id: "+ id);

    // alert(id);
  }



  function findTask(taskId) {
    
    // const media = videos.filter()
    // alert(id);
    
    // const task = tasks.find((task) => task.id === taskId);
    
    
    // alert(taskId +'\n'+ task.id);
    return tasks.find((task) => task.id === taskId);

    // alert(id);
  }


  // export const showFile  = (videos, setVideoFileURL) => {
  //   videos.map(({url})=>console.log(url))
  // }
  



  useEffect(() => {
    // console.log("ro");
    // async function fetchVideos() {
    //   let documents = [];

    //   const snapshot = await videosRef
    //     // .where("student", "==", currentUser.uid)
    //     .get();
    //   if (snapshot.empty) {
    //     console.log("No matching documents.");
    //     return;
    //   } else {
    //     snapshot.forEach((doc) => {
    //       documents.push({ id: doc.id, ...doc.data() });

    //       Promise.all(documents)
    //         .then(() => {
    //           setVideos(documents);
    //         })
    //         .then(() => {
    //          setVideosPending(false);
    //         });
    //     });
    //     return documents;
    //   }
    // }

    // console.log(fetchVideos());


    

  }, []);


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
        taskMedia
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
