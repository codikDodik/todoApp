
import { Component } from "react";
import React from "react";
import TaskList from "../TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";
import "./App.css";

function createTask(id, description, created, completed) {
  return { id, description, created, completed };
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        createTask(1, "Completed task", "17 seconds", false),
        createTask(2, "Editing task", "5 minutes", false),
        createTask(3, "Active task", "5 minutes", false),
      ],
      activeFilter: "All",
    };
  }

  handleFilterChange = (filter) => {
    this.setState({ activeFilter: filter });
  };

  handleDelete = (id) => {
    const updatedTasks = this.state.tasks.filter((task) => task.id !== id);
    this.setState({ tasks: updatedTasks });
  };

  handleToggleDone = (id) => {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      }),
    }));
  };

  handleClearCompleted = () => {
    const updatedTasks = this.state.tasks.filter((task) => !task.completed);
    this.setState({ tasks: updatedTasks });
  };

  addItem = (text) => {
    const newTask = createTask(
      Date.now(),
      text,
      new Date().toLocaleString(),
      false
    );
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  render() {
    const { tasks, activeFilter } = this.state;
    const filteredTasks =
      activeFilter === "All"
        ? tasks
        : activeFilter === "Active"
        ? tasks.filter((task) => !task.completed)
        : tasks.filter((task) => task.completed);

    const tasksLeftCount = tasks.filter((task) => !task.completed).length;

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.handleDelete}
            onToggleDone={this.handleToggleDone}
          />
        </section>
        <Footer
          tasksLeftCount={tasksLeftCount}
          activeFilter={activeFilter}
          onFilterChange={this.handleFilterChange}
          onClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}