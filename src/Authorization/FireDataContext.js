import React, { useState } from "react";
import { firestore,storage,auth } from "../base.js";
import { useEffect, useCollectionData } from "react";
// import { retrieveDownloadUrl } from "../base.js";

export const FireDataContext = React.createContext();

export const FireDataProvider = ({ children }) => {
  const videosRef = firestore.collection("videos");
  // const [videos] = useCollectionData(videosRef, { idField: "id" });

  const [videos, setVideos] = useState([]);
  const [AreVideosPending, setVideosPending] = useState(true);

  const [downloables, setDownloables] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function taskMedia(id) {
    
    const media = videos.filter()

    return ("cześć id: "+ id);

    // alert(id);
  }

  // export const showFile  = (videos, setVideoFileURL) => {
  //   videos.map(({url})=>console.log(url))
  // }
  
  const retrieveDownloadUrl  =  async(url) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(url);
    return await fileRef.getDownloadURL();
  }


  useEffect(() => {
    console.log("ro");
    async function fetchVideos() {
      let documents = [];

      const snapshot = await videosRef
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
              setVideos(documents);
            })
            .then(() => {
             setVideosPending(false);
            });
        });
        return documents;
      }
    }

    console.log(fetchVideos());

  }, []);


  return (
    <FireDataContext.Provider
      value={{
        taskMedia
      }}
    >
      {children}
    </FireDataContext.Provider>
  );
};
