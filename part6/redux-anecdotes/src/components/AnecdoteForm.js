import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const getId = () => (100000 * Math.random()).toFixed(0)

  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0,
    }
  }

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    let anecdote = event.target.newAnecdote
    props.setNotification(`You created ${anecdote.value}`, 5)
    props.createNewAnecdote(asObject(anecdote.value))
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

const mapDispatchToProps = {
  setNotification,
  createNewAnecdote,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
