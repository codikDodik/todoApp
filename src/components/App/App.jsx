import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import './App.css'

function createTask(id, description, created, completed, min, sec) {
  const currentDate = new Date()

  return { id, description, created: currentDate, completed, min, sec }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [createTask(1, 'Test task', '17 seconds', false, 0, 1)],
      activeFilter: 'All',
    }
  }

  handleFilterChange = (filter) => {
    this.setState({ activeFilter: filter })
  }

  handleDelete = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id)
    this.setState({ tasks: updatedTasks })
  }

  handleToggleDone = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        } else {
          return task
        }
      }),
    }))
  }

  handleClearCompleted = () => {
    const updatedTasks = this.state.tasks.filter((task) => !task.completed)
    this.setState({ tasks: updatedTasks })
  }

  addItem = (text, min, sec) => {
    const newTask = createTask(Date.now(), text, new Date(), false, min, sec)
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
      taskMin: min,
      taskSec: sec,
    }))
  }

  handleTaskDescriptionChange = (taskId, newDescription) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, description: newDescription }
        } else {
          return task
        }
      }),
    }))
  }

  render() {
    const { tasks, activeFilter } = this.state
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
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.handleDelete}
            onToggleDone={this.handleToggleDone}
            onDescriptionChange={this.handleTaskDescriptionChange}
          />
        </section>
        <Footer
          tasksLeftCount={tasksLeftCount}
          activeFilter={activeFilter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    )
  }
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
