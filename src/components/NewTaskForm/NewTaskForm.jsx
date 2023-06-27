import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 13 && this.state.value.trim() !== "") {
      // если была нажата клавиша Enter и поле ввода не пустое
      this.props.onItemAdded(this.state.value); // вызываем функцию добавления таска из props
      this.setState({ value: "" }); // очищаем поле ввода
    }
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} // обработчик нажатия на клавишу
          autoFocus
        />
      </header>
    );
  }
}
