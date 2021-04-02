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

import { FireDataContext } from "../Authorization/FireDataContext";
import { FireDataProvider } from "../Authorization/FireDataContext";

import TaskCard from "./Tasks/TaskCard";
import ResultCard from "./Tasks/ResultCard";
import ResultSent from "./Tasks/ResultSent.js";

function Viewer(props) {
  // const usersRef = firestore.collection("users");
  // const [users] = useCollectionData(usersRef, { idField: "id" });

  // const [tasks] = useCollectionData(tasksRef, { idField: "id" });

  // downloables={downloables}
  // isLoading={isLoading}
  // setDownloables={setDownloables}
  // setIsLoading={setIsLoading}

  const { classesPending, tasksPending, tasks, results, resultsPending } = useContext(FireDataContext);

  const [value, onChange] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  // onChange={setEndDate}
  // value={endDate}

  return (
    <div>
      <NMLoggedIn />
      {classesPending ? "" : <NewTaskModal />}

      <Tasks
        state={true}
        label="Dostepne zadania"
        tasks={{ pending:tasksPending, tasks:tasks.map(TaskCard)  }}
      />

      <Tasks
        state={false}
        label="Oddane zadania"
        tasks={{ pending:resultsPending, tasks:results.map(ResultCard) }}
      />

      {/* <Tasks
        state={false}
        label="Ukończone zadania"
        tasks={{ tasksPending, tasks }}
      /> */}
      {/* <div>
        <Calendar
          onClickDay={(value, event) => {
            // const isoDate = value.toDate().toISOString();
            const d = new Date(value).toLocaleDateString("en-GB");
            alert(d);
          }}
          onChange={onChange}
          value={value}
        />
      </div> */}
    </div>
  );
}

export default Viewer;
