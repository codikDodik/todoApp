import React from "react";
import PropTypes from "prop-types";
import "./TaskFilter.css";

const TasksFilter = ({ activeFilter, onFilterChange }) => {
  const buttons = [
    { name: "All", label: "All" },
    { name: "Active", label: "Active" },
    { name: "Completed", label: "Completed" },
  ];

  const handleFilterClick = (filter) => {
    onFilterChange(filter);
  };

  return (
    <ul className="filters">
      {buttons.map(({ name, label }) => (
        <li key={name}>
          <button
            type="button"
            className={activeFilter === name ? "btn selected" : "btn"}
            onClick={() => handleFilterClick(name)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
};

TasksFilter.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default TasksFilter;
