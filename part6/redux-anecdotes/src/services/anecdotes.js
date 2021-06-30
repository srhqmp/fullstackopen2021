import axios from 'axios'

const baseUrl = 'http://localhost:3005/anecdotes'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

const create = async (anecdote) => {
  const result = await axios.post(baseUrl, anecdote)
  return result.data
}

const update = async (anecdote) => {
  const result = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  return result.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update }
