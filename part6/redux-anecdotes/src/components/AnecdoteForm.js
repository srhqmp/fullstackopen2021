import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { displayVoteNotif } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    }
  }

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    let anecdote = event.target.newAnecdote
    const newAnecdote = await anecdoteService.create(asObject(anecdote.value))
    dispatch(displayVoteNotif(`You created ${anecdote.value}`))
    dispatch(createNewAnecdote(newAnecdote))
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
