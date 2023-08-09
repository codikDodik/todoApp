import React, { useState } from 'react'
import PropTypes from 'prop-types'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import './App.css'

function createTask(id, description, created, completed, min, sec) {
  const currentDate = new Date()
  return { id, description, created: currentDate, completed, min, sec }
}

function App() {
  const [tasks, setTasks] = useState([createTask(1, 'Test task', '17 seconds', false, 0, 1)])
  const [activeFilter, setActiveFilter] = useState('All')

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks)
  }

  const handleToggleDone = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const handleClearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    setTasks(updatedTasks)
  }

  const addItem = (text, min, sec) => {
    const newTask = createTask(Date.now(), text, new Date(), false, min, sec)
    setTasks([...tasks, newTask])
  }

  const handleTaskDescriptionChange = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: newDescription }
      }
      return task
    })
    setTasks(updatedTasks)
  }

  let filteredTasks
  if (activeFilter === 'All') {
    filteredTasks = tasks
  } else if (activeFilter === 'Active') {
    filteredTasks = tasks.filter((task) => !task.completed)
  } else {
    filteredTasks = tasks.filter((task) => task.completed)
  }

  const tasksLeftCount = tasks.filter((task) => !task.completed).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onDeleted={handleDelete}
          onToggleDone={handleToggleDone}
          onDescriptionChange={handleTaskDescriptionChange}
        />
      </section>
      <Footer
        tasksLeftCount={tasksLeftCount}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        onClearCompleted={handleClearCompleted}
      />
    </section>
  )
}

App.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  activeFilter: PropTypes.oneOf(['All', 'Active', 'Completed']).isRequired,
}

App.defaultProps = {
  tasks: [],
  activeFilter: 'All',
}

export default App
