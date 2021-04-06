import React, { useContext, useState } from "react";

import "react-calendar/dist/Calendar.css";

import NewTaskModal from "./Tasks/NewTaskModal";
import NMLoggedIn from "./NavMenu/NMLoggedIn";
import Tasks from "./Tasks/Tasks";
import "./Tasks/Task.css";

import { FireDataContext } from "../Authorization/FireDataContext";
import TaskCard from "./Tasks/TaskCard";
import ResultCard from "./Tasks/ResultCard";
import LoadingModal from "./Tasks/LoadingModal";

function Viewer() {
  const {
    classesPending,
    tasksPending,
    tasks,
    results,
    resultsPending,
  } = useContext(FireDataContext);

  return (
    <div>
      <NMLoggedIn />
      {classesPending ? "" : <NewTaskModal />}

      <Tasks
        state={true}
        label="Dostepne zadania"
        tasks={{ pending: tasksPending, tasks: tasks.map(TaskCard) }}
      />

      <Tasks
        state={false}
        label="Oddane zadania"
        tasks={{ pending: resultsPending, tasks: results.map(ResultCard) }}
      />

      <LoadingModal />
    </div>
  );
}

export default Viewer;
