import React from "react";
import TaskList from "../TaskList";
import NewTaskForm from "../NewTaskForm";
import Footer from "../Footer";
import './App.css'

const App = () => {
  const tasks = [
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
  ];

  const tasksLeftCount = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList tasks={tasks} />
      </section>
      <Footer tasksLeftCount={tasksLeftCount} />
    </section>
  );
};

export default App;
