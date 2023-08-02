import React, { Component } from 'react'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      taskMin: '',
      taskSec: '',
    }
  }

  handleTimerChange = (event) => {
    const { name, value } = event.target

    if (name === 'taskMin' && (value < 0 || value > 60)) {
      this.setState({ errorField: 'taskMin' })
      return
    }

    if (name === 'taskSec' && (value < 0 || value > 60)) {
      this.setState({ errorField: 'taskMin' })
      return
    }
    const formattedValue = value.toString().padStart(2, '')

    this.setState({
      [name]: formattedValue,
    })
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.value.trim() !== '' && this.state.taskMin !== '') {
      let taskMin = this.state.taskMin
      let taskSec = this.state.taskSec

      if (taskMin.length == 1) {
        taskMin = `0${taskMin}`
      } else if (taskSec.length == 0) {
        taskMin = '00'
      }

      if (taskSec.length == 1) {
        taskSec = `0${taskSec}`
      } else if (taskSec.length == 0) {
        taskSec = '00'
      }

      this.props.onItemAdded(this.state.value, taskMin, taskSec)
      this.setState({ value: '', taskMin: '', taskSec: '' })
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            required
            id="todoInput"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            required
            type="number"
            name="taskMin"
            className="new-todo-form__timer new-todo-form__min"
            placeholder="Min"
            min={0}
            max={1440}
            value={this.state.taskMin}
            onChange={this.handleTimerChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            required
            type="number"
            name="taskSec"
            className="new-todo-form__timer new-todo-form__sec"
            placeholder="Sec"
            min={0}
            max={60}
            value={this.state.taskSec}
            onChange={this.handleTimerChange}
            onKeyDown={this.handleKeyDown}
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
