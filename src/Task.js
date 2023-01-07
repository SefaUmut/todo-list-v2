import React from "react";
import { Draggable } from "react-beautiful-dnd";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useGlobalContext } from "./context";
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

const Task = ({ id, name, priority, completed, index }) => {
  const { removeTask, toggleDone, editTask, editPriority } = useGlobalContext();

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 5rem 0 rgba(0, 0, 0, 0.2)" : "none",
            opacity: snapshot.isDragging
              ? "1"
              : provided.draggableProps.style.opacity,
          }}
          className={`task`}
        >
          <p>{name}</p>
          <div className="task-icons">
            <button onClick={() => toggleDone(id)}>
              {completed ? <CheckBoxIcon fontSize="small" color="primary" /> : <CheckBoxOutlineBlankIcon fontSize="small" color="info" />}
            </button>
            <button onClick={() => removeTask(id)}>
              <DeleteOutlineIcon fontSize="small" color="info" />
            </button>
            <button onClick={() => editTask(id)}>
              <AutoFixHighIcon color="info" fontSize="xsmall" />
            </button>
            <div className="custom-select">
              <button
               disabled={priority === "low" ? true : false}
               className={priority === "low" ? "active" : ""} onClick={() => { editPriority(id, "low") }}>
                {priority === "low" ? "low" : <PriorityHighOutlinedIcon fontSize="small" color="info" />}
              </button>
              <button className={priority === "medium" ? "active" : ""} onClick={() => { editPriority(id, "medium") }}>
                {priority === "medium" ? "medium" : <PriorityHighOutlinedIcon fontSize="small" color="warning" />}
              </button>
              <button className={priority === "high" ? "active" : ""} onClick={() => { editPriority(id, "high") }}>
                {priority === "high" ? "high" : <PriorityHighOutlinedIcon fontSize="small" color="error" />}
              </button>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
