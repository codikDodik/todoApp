import "./Task.css";
import React, { Component } from "react";

export default class Task extends Component {
  render() {
    const { description, created, completed } = this.props.task;

    return (
      <li className={completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            defaultChecked={completed}
          />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {created} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy"></button>
        </div>
        <input type="text" className="edit" defaultValue={description} />
      </li>
    );
  }
}


