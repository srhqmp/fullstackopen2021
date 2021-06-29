import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote, createNewAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvote(id))
  }

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    dispatch(createNewAnecdote(event.target.newAnecdote.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="newAnecdote" required/>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
