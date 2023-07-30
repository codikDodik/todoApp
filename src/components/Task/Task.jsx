/* eslint-disable jsx-a11y/no-autofocus */
import './Task.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    completed: this.props.task.completed,
    editing: false,
    timerRunning: false,
    startTime: null,
    elapsedTime: 0,
  }

  handleStartTimer = () => {
    if (!this.state.timerRunning) {
      this.setState({
        timerRunning: true,
        startTime: Date.now() - this.state.elapsedTime,
      })
      this.timerInterval = setInterval(() => {
        this.setState({ elapsedTime: Date.now() - this.state.startTime })
      }, 1000)
    }
  }

  handleStopTimer = () => {
    clearInterval(this.timerInterval)
    this.setState({ timerRunning: false })
  }

  formatElapsedTime() {
    const minutes = Math.floor(this.state.elapsedTime / 60000)
    const seconds = ('0' + Math.floor((this.state.elapsedTime % 60000) / 1000)).slice(-2)
    return `${minutes}:${seconds}`
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
          <span className="description">
            <button className="icon icon-play" onClick={this.handleStartTimer}></button>
            <button className="icon icon-pause" onClick={this.handleStopTimer}></button>
            {this.state.timerRunning || this.state.elapsedTime > 0 ? this.formatElapsedTime() : '0:00'}
          </span>
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
