import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const handleNewAnecdote = (event) => {
    event.preventDefault()
    dispatch(createNewAnecdote(event.target.newAnecdote.value))
    event.target.newAnecdote.value = ''
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
