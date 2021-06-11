import axios from "axios";

const baseUrl = "http://localhost:5001/persons";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const create = (personObject) => {
  return axios
    .post(baseUrl, personObject)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(() => console.log("deleted person with id: ", id));
};

const updatePerson = (id, newPersonObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newPersonObject)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export default { getAll, create, deletePerson, updatePerson };
