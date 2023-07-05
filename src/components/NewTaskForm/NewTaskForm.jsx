import React, { Component } from 'react'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.value.trim() !== '') {
      this.props.onItemAdded(this.state.value)
      this.setState({ value: '' })
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <label htmlFor="todoInput">
          <input
            id="todoInput"
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </label>
      </header>
    )
  }
}
