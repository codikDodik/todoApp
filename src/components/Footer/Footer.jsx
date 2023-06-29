import React from "react";
import TasksFilter from "../TasksFilter";
import "./Footer.css";

const Footer = ({
  tasksLeftCount,
  activeFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeftCount} items left</span>
      <TasksFilter
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
