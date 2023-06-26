import React from "react";
import Task from "../Task";
import "./TaskList.css";

const TaskList = ({ tasks, onDeleted }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleted={() => onDeleted(task.id)} />
      ))}
    </ul>
  );
};

export default TaskList;
