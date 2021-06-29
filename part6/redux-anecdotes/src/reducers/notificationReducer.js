const initialState = {
  message: 'hello there, thanks for using my anecdotes',
  display: '',
}

export const displayVoteNotif = (message) => {
  return {
    type: 'VOTE_NOTIF',
    data: {
      message,
      display: '',
    },
  }
}

export const hideNotif = () => {
  return {
    type: 'HIDE_NOTIF',
    data: {
      message: '',
      display: 'none',
    },
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE_NOTIF':
      return action.data
    case 'HIDE_NOTIF':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
