import './Task.css'
import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  state = {
    completed: false,
  }

  handleComplete = () => {
    this.setState((prevState) => ({ completed: !prevState.completed }))
    this.props.onToggleDone()
  }

  render() {
    const { description, created } = this.props.task
    const { completed } = this.state

    const createdAgo = formatDistanceToNow(new Date(created))

    return (
      <li className={completed ? 'completed' : ''}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onChange={this.handleComplete} />
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
          <button type="button" className="icon icon-edit"></button>
          <button type="button" className="icon icon-destroy" onClick={() => this.props.onDeleted()}></button>
        </div>
        <input type="text" className="edit" defaultValue={description} />
      </li>
    )
  }
}
