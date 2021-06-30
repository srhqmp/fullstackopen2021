export const setFilter = (value) => {
  return {
    type: 'SET_FILTER',
    data: {
      value,
    },
  }
}

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER': {
      state = action.data.value
      return state
    }
    case 'GET_FILTER':
      return state
    default:
      return state
  }
}

export default filterReducer
