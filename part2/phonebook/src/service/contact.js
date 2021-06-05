import axios from 'axios'
const baseUrl = 'api/phonebook'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addContact = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  console.log(request)
  return request.then(response => response.data)
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(request)
  return request.then(response => response.data)
}

const updateContact = (id, newData) => {
  console.log('update contact', newData)
  const request = axios.put(`${baseUrl}/${id}`, newData)
  return request.then(response => {
    console.log(response)
    return response.data
  })
}

const exportObject = { getAll, addContact, deleteContact, updateContact }

export default exportObject