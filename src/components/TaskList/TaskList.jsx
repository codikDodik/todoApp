import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ tasks, onDeleted, onToggleDone, onDescriptionChange }) => {
  const handleTaskDescriptionChange = (newDescription, oldDescription) => {
    onDescriptionChange(newDescription, oldDescription)
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDeleted={() => onDeleted(task.id)}
          onToggleDone={() => onToggleDone(task.id)}
          onDescriptionChange={handleTaskDescriptionChange}
        />
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
}

export default TaskList
