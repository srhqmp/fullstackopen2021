const initialState = 'hello there, thanks for using my anecdotes'

export const displaySuccessNotif = (message) => {
  return {
    type: 'SUCCESS_NOTIF',
    data: {
      message,
    },
  }
}

export const displayErrorNotif = (message) => {
  return {
    type: 'ERROR_NOTIF',
    data: {
      message,
    },
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SUCCESS_NOTIF':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
