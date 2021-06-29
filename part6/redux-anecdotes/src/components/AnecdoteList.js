import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { displayVoteNotif } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const vote = (id, anecdote) => {
    dispatch(upvote(id))
    dispatch(displayVoteNotif(`You voted ${anecdote.content}`))
  }

  return (
    <div>
      {anecdotes
        .filter((anecdote) =>
          filter
            ? anecdote.content.toLowerCase().includes(filter.toLowerCase())
            : anecdote
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
