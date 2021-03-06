import React, { useContext } from "react";
import { FireDataContext } from "../FireData/FireDataContext";
import { ResultsContext } from "../FireData/ResultsContext";
import { TasksContext } from "../FireData/TasksContext";

import { AuthContext } from "../Authorization/Auth";
import NMAction from "../NavMenu/NMAction";
import Tasks from "./Tasks/Tasks";
import TaskCard from "./Tasks/TaskCard";
import ResultCard from "./Tasks/ResultCard";
import NewTaskModal from "./Tasks/NewTaskModal";
import LoadingModal from "./Tasks/LoadingModal";
import "./Tasks/Task.css";

function Viewer() {
  const {
    classesPending,
  } = useContext(FireDataContext);

  const {
    tasksPending,
    tasks,
  } = useContext(TasksContext);

  const {
    results,
    resultsPending,
  } = useContext(ResultsContext);

  const { allowCoach } = useContext(AuthContext);

  return (
    <div>
      <NMAction title="Zadania" actions={ classesPending && ( allowCoach &&  <NewTaskModal />)}/>
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
