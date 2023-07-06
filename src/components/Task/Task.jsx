/* eslint-disable jsx-a11y/no-autofocus */
import './Task.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    completed: this.props.task.completed,
    editing: false,
  }

  handleComplete = () => {
    this.setState((prevState) => ({ completed: !prevState.completed }))
    this.props.onToggleDone()
  }

  handleEdit = () => {
    this.setState((prevState) => ({ editing: !prevState.editing }))
  }

  handleDescriptionChange = (event) => {
    const newDescription = event.target.value
    this.props.onDescriptionChange(this.props.task.id, newDescription)
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleEdit()
    }
  }

  render() {
    const { description, created } = this.props.task
    const { completed } = this.state

    const createdAgo = formatDistanceToNow(new Date(created))

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <label htmlFor="toggleButton">
            <input
              className="toggle"
              id="toggleButton"
              type="checkbox"
              checked={completed}
              onChange={this.handleComplete}
            />
          </label>
          <button
            type="button"
            className="btn"
            onClick={this.handleComplete}
            onKeyDown={this.handleKeyDown}
            tabIndex={0}
          >
            <span className={`description ${completed ? 'completed' : ''}`}>{description}</span>
            <span className="created">created {createdAgo} ago</span>
          </button>
          {this.state.editing ? (
            <label htmlFor="editingButton">
              <input
                className="editing"
                type="text"
                id="editingButton"
                defaultValue={description}
                onChange={this.handleDescriptionChange}
                onKeyDown={this.handleKeyDown}
                autoFocus
              />
            </label>
          ) : null}
          <button type="button" className="icon icon-edit" onClick={this.handleEdit}></button>
          <button type="button" className="icon icon-destroy" onClick={() => this.props.onDeleted()}></button>
        </div>
      </li>
    )
  }
}
