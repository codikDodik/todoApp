import React, { useState, useEffect, useCallback } from 'react'
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

const Task = ({ task, onDeleted, onToggleDone, onDescriptionChange }) => {
  const [completed, setCompleted] = useState(task.completed)
  const [editing, setEditing] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [currentMin, setCurrentMin] = useState(task.min)
  const [currentSec, setCurrentSec] = useState(task.sec)

  const handleStopTimer = useCallback(() => {
    clearInterval(timerId)
    setTimerId(null)
  }, [timerId])

  useEffect(() => {
    const handleEffect = () => {
      if (completed) {
        handleStopTimer()
      }
    }
    handleEffect()
  }, [completed, handleStopTimer])

  const handleStartTimer = () => {
    const newTimerId = setInterval(() => {
      if (currentSec > 0) {
        setCurrentSec((prevSec) => prevSec - 1)
      } else {
        if (currentMin > 0) {
          setCurrentMin((prevMin) => prevMin - 1)
          setCurrentSec(59)
        } else {
          handleStopTimer()
          setCompleted((prevCompleted) => !prevCompleted)
          onToggleDone()
        }
      }
    }, 1000)

    setTimerId(newTimerId)
  }

  const handleComplete = () => {
    setCompleted((prevCompleted) => !prevCompleted)
    onToggleDone()
  }

  const handleEdit = () => {
    setEditing((prevEditing) => !prevEditing)
  }

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value
    onDescriptionChange(task.id, newDescription)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleEdit()
    }
  }

  const { description, created } = task

  const createdAgo = formatDistanceToNow(new Date(created))

  return (
    <li className={`default ${completed ? 'completed' : ''}`}>
      <div className="view">
        <label htmlFor="toggleButton">
          <input className="toggle" id="toggleButton" type="checkbox" checked={completed} onChange={handleComplete} />
        </label>
        <button type="button" className="btn" onClick={handleComplete} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className={`description ${completed ? 'completed' : ''}`}>{description}</div>
        </button>
        <div className="description">
          <button type="button" className="icon icon-play" onClick={handleStartTimer}></button>
          <button type="button" className="icon icon-pause" onClick={handleStopTimer}></button>
          <span>
            {currentMin}:{currentSec.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="created">created {createdAgo} ago</div>
        {editing ? (
          <label htmlFor="editingButton">
            <input
              className="editing"
              type="text"
              id="editingButton"
              defaultValue={description}
              onChange={handleDescriptionChange}
              onKeyDown={handleKeyDown}
            />
          </label>
        ) : null}
        <button type="button" className="icon icon-edit" onClick={handleEdit}></button>
        <button type="button" className="icon icon-destroy" onClick={() => onDeleted()}></button>
      </div>
    </li>
  )
}

export default Task
