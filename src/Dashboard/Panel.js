import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  Spinner,
  CardColumns,
  CardDeck,
  UncontrolledCollapse,
  Button,
  Collapse,Card,CardBody
} from "reactstrap";

import Tasks from './Tasks/Tasks';


import SpinnerGroup from '../Utilities/SpinnerGroup';

import NMLoggedIn from "./NavMenu/NMLoggedIn";

import { AuthContext, AuthProvider } from "../Authorization/Auth.js";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "../base.js";
import ItemIconNames from "../Utilities/IconNames";
import TaskCard from "./Tasks/TaskCard";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



import "./Tasks/Task.css";

import NewTaskModal from "./Tasks/NewTaskModal";

function Viewer(props) {
  const { currentUser } = useContext(AuthContext);

  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef, { idField: "id" });

  const tasksRef = firestore.collection("tasks");
  // const [tasks] = useCollectionData(tasksRef, { idField: "id" });

  const [tasks, setTasks] = useState([]);
  const [tasksPending, setTasksPending] = useState(true);

  const groupsRef = firestore.collection("classes");
  const [classes, setClasses] = useState([]);
  const [classesPending, setClassesPending] = useState(true);


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
              // console.log(documents);
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
        .where("students", 'array-contains', currentUser.email)
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
          // console.log(documents);
          setClasses(documents);
          // setTasks(documents);
        })
        .then(() => {
          setClassesPending(false);
        });

        // return documents;


        // console.log(classes)

        // Promise.all(snapshot)
        //     .then((result) => {
        //       // console.log(result)
        //   // setClasses(result);
        //     })
        //     .then(() => {
        //       // setClassesPending(false);
        //     });
     

        // snapshot.forEach((doc) => {
        //   documents.push({ id: doc.id, ...doc.data() });

        //   Promise.all(documents)
        //     .then((result) => {
    
        //   setClasses(result);
        //     })
        //     .then(() => {
        //       setClassesPending(false);
        //     });
        // });
        // return snapshot;
      }
    }

    const items = fetchTasks();
    // console.log(items);

    fetchGroups();
    // const groups2 = fetchGroups();
    // console.log(groups2);

  }, []);


  const [value, onChange] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

                      // onChange={setEndDate}
                      // value={endDate}

  return (
    <div>
      <NMLoggedIn />
     { classesPending ? "Loding..." : <NewTaskModal  classes={classes} tasksRef={tasksRef}/> }
      <Tasks
        state={true}
        label="Dostepne zadania"
        tasks={{ tasksPending, tasks }}
      />
      <Tasks
        state={false}
        label="Ukończone zadania"
        tasks={{ tasksPending, tasks }}
      />
      <div>

       <Calendar
        onClickDay={(value, event)=>{
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







// const NewTask = () => {
//   const addIcon = ItemIconNames.find((item) => item.name === "add" );
//   return (
//     <Card>
//     <CardBody>
//     <Button  color="primary" className="btn-circle" >
//     <span className="fa-3x"> {addIcon.faIcon} </span>
//     </Button>
//     </CardBody>
//     </Card>
  
//   )
// }