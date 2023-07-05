import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskList from '../TaskList'
import NewTaskForm from '../NewTaskForm'
import Footer from '../Footer'
import './App.css'

function createTask(id, description, created, completed) {
  const currentDate = new Date()

  if (created === '17 seconds') {
    currentDate.setSeconds(currentDate.getSeconds() - 17)
  } else if (created === '5 minutes') {
    currentDate.setMinutes(currentDate.getMinutes() - 5)
  }

  return { id, description, created: currentDate, completed }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [
        createTask(1, 'Completed task', '17 seconds', false),
        createTask(2, 'Editable task', '5 minutes', false),
        createTask(3, 'Active task', '5 minutes', false),
      ],
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

  addItem = (text) => {
    const newTask = createTask(Date.now(), text, new Date(), false)
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
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
