/* eslint-disable jsx-a11y/no-autofocus */
import './Task.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

class Task extends Component {
  state = {
    completed: this.props.task.completed,
    editing: false,
    timerId: null,
    currentMin: this.props.task.min,
    currentSec: this.props.task.sec,
  }

  handleStartTimer = () => {
    const timerId = setInterval(() => {
      if (this.state.currentSec > 0) {
        this.setState((prevState) => ({ currentSec: prevState.currentSec - 1 }))
      } else {
        if (this.state.currentMin > 0) {
          this.setState((prevState) => ({
            currentMin: prevState.currentMin - 1,
            currentSec: 59,
          }))
        } else {
          this.handleStopTimer()
          this.setState((prevState) => ({ completed: !prevState.completed }))
          this.props.onToggleDone()
        }
      }
    }, 1000)

    this.setState({ timerId })
  }

  handleStopTimer = () => {
    clearInterval(this.state.timerId)
    this.setState({ timerId: null })
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
    const { completed, currentMin, currentSec } = this.state

    const createdAgo = formatDistanceToNow(new Date(created))

    return (
      <li className={`default ${completed ? 'completed' : ''}`}>
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
            <div className={`description ${completed ? 'completed' : ''}`}>{description}</div>
          </button>
          <div className="description">
            <button type="button" className="icon icon-play" onClick={this.handleStartTimer}></button>
            <button type="button" className="icon icon-pause" onClick={this.handleStopTimer}></button>
            <span>
              {currentMin}:{currentSec.toString().padStart(2, '0')}
            </span>
          </div>
          <div className="created">created {createdAgo} ago</div>
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

export default Task
