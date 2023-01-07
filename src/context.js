import React, { useState, useContext, useRef } from "react";

const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(getTasks());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState("all");

  const showAlert = (show, msg, type) => {
    setAlert({ show, msg, type });
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    showAlert(true, "Task Removed.", "error");
  };

  const toggleDone = (id) => {
    if (isEditing) {
      return showAlert(true, "Please finish editing.", "warning");
    } else if (tasks.find((task) => task.id === id).completed) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: false } : task
        )
      );
      showAlert(true, "Task Marked as Incomplete.", "info");
    } else
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    showAlert(true, "Task Marked as Complete.", "info");
  };

  const editTask = (id) => {
    const { name } = tasks.find((task) => task.id === id);
    setIsEditing(!isEditing);
    if (isEditing) {
      setEditId(null);
      setName("");
    } else {
      setEditId(id);
      setName(name);
    }
    inputRef.current.focus();
  };

  const editPriority = (id, priority) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, priority: priority } : task
      )
    );
    showAlert(true, "Task Priority Changed.", "info");
  };


  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        removeTask,
        toggleDone,
        alert,
        showAlert,
        isEditing,
        setIsEditing,
        editPriority,
        editId,
        setEditId,
        editTask,
        name,
        setName,
        getTasks,
        filter,
        setFilter,
        inputRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
