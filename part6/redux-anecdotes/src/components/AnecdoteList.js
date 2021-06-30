import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { displayVoteNotif } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    const anecdoteObj = { ...anecdote, votes: anecdote.votes + 1 }
    const newAnecdote = await anecdoteService.update(anecdoteObj)
    dispatch(upvote(newAnecdote))
    dispatch(displayVoteNotif(`You voted ${newAnecdote.content}`))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
