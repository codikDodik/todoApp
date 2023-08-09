import React, { useState } from 'react'
import './NewTaskForm.css'

function NewTaskForm(props) {
  const [value, setValue] = useState('')
  const [taskMin, setTaskMin] = useState('')
  const [taskSec, setTaskSec] = useState('')

  const handleTimerChange = (event) => {
    const { name, value } = event.target

    if (name === 'taskMin' && (value < 0 || value > 60)) {
      return
    }

    if (name === 'taskSec' && (value < 0 || value > 60)) {
      return
    }

    const formattedValue = value.toString().padStart(2, '')

    if (name === 'taskMin') {
      setTaskMin(formattedValue)
    } else if (name === 'taskSec') {
      setTaskSec(formattedValue)
    }
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && value.trim() !== '' && taskMin !== '') {
      let formattedTaskMin = taskMin.length === 1 ? `0${taskMin}` : taskMin
      let formattedTaskSec = taskSec.length === 1 ? `0${taskSec}` : taskSec

      if (taskSec === '') {
        formattedTaskSec = '00'
      }

      props.onItemAdded(value, formattedTaskMin, formattedTaskSec)
      setValue('')
      setTaskMin('')
      setTaskSec('')
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          required
          id="todoInput"
          className="new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <input
          required
          type="number"
          name="taskMin"
          className="new-todo-form__timer new-todo-form__min"
          placeholder="Min"
          min={0}
          max={1440}
          value={taskMin}
          onChange={handleTimerChange}
          onKeyDown={handleKeyDown}
        />
        <input
          required
          type="number"
          name="taskSec"
          className="new-todo-form__timer new-todo-form__sec"
          placeholder="Sec"
          min={0}
          max={60}
          value={taskSec}
          onChange={handleTimerChange}
          onKeyDown={handleKeyDown}
        />
      </form>
    </header>
  )
}

export default NewTaskForm
