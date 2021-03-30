import React, { useContext, useEffect, useState } from "react";

import { AuthContext, AuthProvider } from "../Authorization/Auth.js";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore, retrieveDownloadUrl } from "../base.js";
import { uploadFile, showFile } from "../base";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import NewTaskModal from "./Tasks/NewTaskModal";
import NMLoggedIn from "./NavMenu/NMLoggedIn";
import Tasks from "./Tasks/Tasks";
import "./Tasks/Task.css";
// import SpinnerGroup from "../Utilities/SpinnerGroup";




function Viewer(props) {
  const { currentUser } = useContext(AuthContext);

  // const usersRef = firestore.collection("users");
  // const [users] = useCollectionData(usersRef, { idField: "id" });

  const tasksRef = firestore.collection("tasks");
  // const [tasks] = useCollectionData(tasksRef, { idField: "id" });
  const [tasks, setTasks] = useState([]);
  const [tasksPending, setTasksPending] = useState(true);

  const groupsRef = firestore.collection("classes");
  const [classes, setClasses] = useState([]);
  const [classesPending, setClassesPending] = useState(true);


  // downloables={downloables}
  // isLoading={isLoading}
  // setDownloables={setDownloables}
  // setIsLoading={setIsLoading}

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

    async function fetchGroups() {
      let documents = [];

      const snapshot = await groupsRef
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
    fetchGroups();
  }, []);

  const [value, onChange] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  // onChange={setEndDate}
  // value={endDate}

  return (
    <div>
      <NMLoggedIn />
      {classesPending ? (
        "Loding..."
      ) : (
        <NewTaskModal classes={classes} tasksRef={tasksRef} />
      )}

      <Tasks
        state={true}
        label="Dostepne zadania"
        tasks={{ tasksPending, tasks }}
      />
      {/* <Tasks
        state={false}
        label="Ukończone zadania"
        tasks={{ tasksPending, tasks }}
      /> */}
      <div>
        <Calendar
          onClickDay={(value, event) => {
            // const isoDate = value.toDate().toISOString();
            const d = new Date(value).toLocaleDateString("en-GB");
            alert(d);
          }}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}

export default Viewer;
