import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
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
    this.setState({
      [name]: value,
    })
    console.log(this.state.taskMin, this.state.taskSec)
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.value.trim() !== '' && this.state.taskMin !== '') {
      this.props.onItemAdded(this.state.value)
      this.setState({ value: '' })
      this.setState({ taskMin: '' })
      this.setState({ taskSec: '' })
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
            id="todoInput"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            type="number"
            name="taskMin"
            className="new-todo-form__timer new-todo-form__min"
            placeholder="Min"
            required
            min={0}
            max={1440}
            value={this.state.taskMin}
            onChange={this.handleTimerChange}
            onKeyDown={this.handleKeyDown}
          />
          <input
            type="number"
            name="taskSec"
            className="new-todo-form__timer new-todo-form__sec"
            placeholder="Sec"
            min={0}
            max={60}
            required
            value={this.state.taskSec}
            onChange={this.handleTimerChange}
            onKeyDown={this.handleKeyDown}
          />
        </form>
      </header>
    )
  }
}
