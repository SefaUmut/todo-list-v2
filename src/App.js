import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./List";
import Alert from "./Alert";
import { useGlobalContext } from "./context";
import DarkModeToggle from './DarkModeToggle';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';

const App = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
  } = useGlobalContext();

  const addTask = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "Please enter a task.", "warning");
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) => {
          return task.id === editId ? { ...task, name: name } : task;
        })
      );
      setIsEditing(false);
      setEditId(null);
      setName("");
      showAlert(true, "Task Edited.", "info");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name: name,
        completed: false,
        priority: "low",
      };
      setTasks([...tasks, newTask]);
      showAlert(true, "Task Added.", "success");
      setName("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      const reOrdered = [...tasks];
      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);
      setTasks(reOrdered);
    }
  };

  return (
    <>
      <div className='container'>
        {alert && <Alert msg={alert.msg} type={alert.type} />}
        <form className='head' onSubmit={addTask}>
          <h1 className="title">To Do List</h1>
          <input
            type='text'
            ref={inputRef}
            placeholder='New Task ...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>
            {
              isEditing ?
                <div className="btn-info">
                  <AutoFixHighIcon className="icon" /> EDIT
                </div>
                :
                <div className="btn-info">
                  <AddIcon className="icon" /> ADD
                </div>
            }
          </button>
        </form>
        <div className='filter'>
          <button
            data-filter='all'
            className={filter === "all" ? "btn-info active" : "btn-info"}
            onClick={() => setFilter("all")}
          >
            <DensitySmallIcon data-filter='all' className="icon" />
            <p>ALL</p>
          </button>
          <button
            data-filter='completed'
            className={filter === "completed" ? "btn-info active" : "btn-info"}
            onClick={() => setFilter("completed")}
          >
            <DoneAllIcon className="icon" />
            <p>Completed</p>
          </button>
          <button
            data-filter='uncompleted'
            className={filter === "uncompleted" ? "btn-info active" : "btn-info"}
            onClick={() => setFilter("uncompleted")}
          >
            <RemoveDoneIcon className="icon" />
            <p>Uncompleted</p>
          </button>
        </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks.length > 0 ? (
            <List />
          ) : (
            <p className='no-tasks'>Your list is clear!</p>
          )}
        </DragDropContext>
        {tasks.length > 2 && (
          <button
            className='btn-delete-all'
            onClick={() => {
              setTasks([]);
              showAlert(true, "Your list is clear!", "warning");
            }}
            title='Delete All Tasks (Completed and Uncompleted)!'
          >
            Clear All
          </button>
        )}
        <DarkModeToggle />
      </div>
    </>
  );
};

export default App;
