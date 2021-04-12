import React, { useContext } from "react";
import { FireDataContext } from "../Authorization/FireDataContext";
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
    tasksPending,
    tasks,
    results,
    resultsPending,
  } = useContext(FireDataContext);

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
