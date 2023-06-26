import { Component } from "react";
import React from "react";
import TaskList from "../TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 1,
          description: "Completed task",
          created: "17 seconds",
          completed: true,
        },
        {
          id: 2,
          description: "Editing task",
          created: "5 minutes",
          completed: false,
        },
        {
          id: 3,
          description: "Active task",
          created: "5 minutes",
          completed: false,
        },
      ],
    };
  }

  handleDelete = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const tasksLeftCount = this.state.tasks.filter(
      (task) => !task.completed
    ).length;
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList tasks={this.state.tasks} onDeleted={this.handleDelete} />
        </section>
        <Footer tasksLeftCount={tasksLeftCount} />
      </section>
    );
  }
}
