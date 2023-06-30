import React from "react";
import PropTypes from "prop-types";
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

Footer.propTypes = {
  tasksLeftCount: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
