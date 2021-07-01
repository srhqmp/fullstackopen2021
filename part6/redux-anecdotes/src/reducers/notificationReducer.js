const initialState = {
  message: 'hello there, thanks for using my anecdotes',
  display: '',
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIF',
    data: {
      message: '',
      display: 'none',
    },
  }
}
//setTimeout seems to be working fine
export const setNotification = (content, time) => {
  return async (dispatch) => {
    setTimeout(() => dispatch(clearNotification()), time * 1000)
    dispatch({
      type: 'SET_NOTIF',
      data: {
        message: content,
        display: '',
      },
    })
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIF': {
      return action.data
    }
    case 'CLEAR_NOTIF':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
