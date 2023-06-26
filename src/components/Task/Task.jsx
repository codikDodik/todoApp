import "./Task.css";
import React, { Component } from "react";

export default class Task extends Component {
  state = {
    completed: false,
  };

  handleComplete = () => {
    this.setState((prevState) => ({ completed: !prevState.completed }));
  };

  render() {
    const { description, created } = this.props.task;
    const { completed } = this.state;

    return (
      <li className={completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={this.handleComplete}
          />
          <label onClick={this.handleComplete}>
            <span className={`description ${completed ? "completed" : ""}`}>
              {description}
            </span>
            <span className="created">created {created} ago</span>
          </label>
          <button type="button" className="icon icon-edit"></button>
          <button
            type="button"
            className="icon icon-destroy"
            onClick={() => this.props.onDeleted()}
          ></button>
        </div>
        <input type="text" className="edit" defaultValue={description} />
      </li>
    );
  }
}
