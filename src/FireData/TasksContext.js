import React, { useState, useContext } from "react";
import { firestore } from "../base.js";
import { useEffect } from "react";
import { AuthContext } from "../Authorization/Auth.js";
import { fetchData, taskMedia } from "./FileFunctions.js";

export const TasksContext = React.createContext();

export const TasksProvider = ({ children }) => {
  
    const { currentUser } = useContext(AuthContext);
  
    const tasksRef = firestore.collection("tasks");
    const [tasks, setTasks] = useState([]);
    const [tasksPending, setTasksPending] = useState(true);
    const [alertVisibility, setAlertVisibility] = useState(false);
    
    function findTask(taskId) {
      return tasks.find((task) => task.id === taskId);
    }
  
    async function createTask(data, setNewTaskModal) {
      try {
        tasksRef.add({ ...data, coach: currentUser.email }).then((result) => {
          if (result.id !== null) {
            setAlertVisibility(true);
            setNewTaskModal(false);
          }
        });
      } catch (error) {
        alert(error);
      }
    }
  
    useEffect(() => {
      fetchData({
        ref: tasksRef,
        dataSetter: setTasks,
        pendingSetter: setTasksPending,
      });
    }, []);
  
    return (
      <TasksContext.Provider
        value={{
          tasks,
          tasksPending,
          findTask,
          createTask,
          taskMedia,
  
          setAlertVisibility,
          alertVisibility,
        }}
      >
        {children}
      </TasksContext.Provider>
    );
  };
  
