import React from "react";
import Task from "../Task";
import "./TaskList.css";

const TaskList = ({ tasks, onDeleted, onToggleDone }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleted={() => onDeleted(task.id)}
        onToggleDone={() => onToggleDone(task.id)} />
      ))}
    </ul>
  );
};

export default TaskList;
