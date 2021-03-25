import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Spinner, CardColumns, CardDeck } from "reactstrap";

import NMLoggedIn from "./NavMenu/NMLoggedIn";

import { AuthContext, AuthProvider } from "../Authorization/Auth.js";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "../base.js";

import TaskCard from "./Task";

const spinnerGroup = (
  <div>
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
  </div>
);

function Viewer(props) {
  const { currentUser } = useContext(AuthContext);

  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef, { idField: "id" });

  const tasksRef = firestore.collection("tasks");
  // const [tasks] = useCollectionData(tasksRef, { idField: "id" });


  const [tasks, setTasks] = useState([]); 
  const [tasksPending, setTasksPending] = useState(true); 

  useEffect(() => {
    // auth.onAuthStateChanged((user) => {
    //   setCurrentUser(user);
    //   setPending(false);
    // });


    async function fetchTasks() {
      
      let documents=[];
      
      const snapshot = await tasksRef
          .where("student", "==", currentUser.uid)
          .get();
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        else 
        {

     
          // .then(() => {
          //   setIsLoading(false);
          // });


          // console.log(snapshot)
        snapshot.forEach((doc) => {
         documents.push({id: doc.id, ...doc.data()}); 

         Promise.all(documents)
         .then(() => {console.log(documents); setTasks(documents) }).then(()=>{setTasksPending(false)})

        // console.log(doc.id, "=>", doc.data());
        
      });
      return documents;

        }

    }

    const items = fetchTasks();
    console.log(items );




    
    // onClick={async () => {
    //   const snapshot = await tasksRef
    //     .where("student", "==", currentUser.uid)
    //     .get();
    //   if (snapshot.empty) {
    //     console.log("No matching documents.");
    //     return;
    //   }

    //   snapshot.forEach((doc) => {
    //     console.log(doc.id, "=>", doc.data());
    //   });

  // useEffect(() => {
  //   async function fetchDownloableURLs() {
  //     let downloables = [];
  //     const promises = videos.map(async ({ url }) => {
  //       await retrieveDownloadUrl(url).then((result) =>
  //         downloables.push(result)
  //       );
  //     });
  //     await Promise.all(promises)
  //       .then(() => setDownloables(downloables))
  //       .then(() => {
  //         setIsLoading(false);
  //       });
  //   }
  //   videos && fetchDownloableURLs();
  // }, [videos]);



  }, []);

  return (
    <div>
      <NMLoggedIn />
      {/* {usersRef.doc("BLxO7xwhAWbNBjHTD9ouE9jH8Av2").get()} */}

      {/* <button
        onClick={() => {
          console.log(users);
          usersRef
            .doc("BLxO7xwhAWbNBjHTD9ouE9jH8Av2")
            .get()
            .then((snapshot) => console.log(snapshot));
        }}
      >
        dgfgdf
      </button>

      <button
        onClick={() => {
          console.log(currentUser.uid);
          firestore
            .collection("tasks")
            .where("student", "==", currentUser.uid)
            .get()
            .then((result) => console.log(result));
        }}
      >
        read tasks
      </button>

      <button
        onClick={async () => {
          const snapshot = await tasksRef
            .where("student", "==", currentUser.uid)
            .get();
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }

          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
          });
        }}
      >
        read tasks2
      </button> */}



{/* 
      {users.length}
      {currentUser.email}
      {"   "}
      {currentUser.uid} */}


      <CardColumns className="m-2">
      {/* { tasksPending ? "Loading///" : tasks.map(({coach})=> <li> {coach}</li>)} */}
      { tasksPending ? "Loading///" : tasks.map( TaskCard )}
      {/* { tasksPending ? "Loading///" : tasks.map( TaskCard )}
      { tasksPending ? "Loading///" : tasks.map( TaskCard )}
      { tasksPending ? "Loading///" : tasks.map( TaskCard )} */}
      </CardColumns>

      {/* <h2>Sent Documents</h2>
      {props.isLoading
        ? spinnerGroup
        : props.downloables.map((URL) => (
            <ReactPlayer url={URL} width="40%" height="40%" controls={true} />
          ))} */}
    </div>
  );
}

export default Viewer;
