import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { displayVoteNotif } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleNewAnecdote = (event) => {
    event.preventDefault()
    let anecdote = event.target.newAnecdote
    dispatch(displayVoteNotif(`You created ${anecdote.value}`))
    dispatch(createNewAnecdote(anecdote.value))
    anecdote.value = ''
  }

  return (
    <form onSubmit={handleNewAnecdote}>
      <h2>create new</h2>
      <div>
        <input name="newAnecdote" required />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm
