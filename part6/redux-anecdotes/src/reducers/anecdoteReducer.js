import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const upvote = (data) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(data)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}

export const createNewAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
      type: 'ADD_NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      return state.map((obj) =>
        obj.id === action.data.id ? { ...obj, votes: action.data.votes } : obj
      )
    case 'ADD_NEW_ANECDOTE':
      return state.concat(action.data)
    default:
      return state
  }
}

export default anecdoteReducer
