import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/storage'

let token = null
let headers = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
	headers = {
		Authorization: token,
	}
}

const getAll = async () => {
	const response = await axios.get(baseUrl, { headers })
	return response.data
}

const create = async (newObject) => {
	const response = await axios.post(baseUrl, newObject, { headers })
	return response.data
}

const update = async (newObject) => {
	const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
		headers,
	})
	return response.data
}

const remove = async (object) => {
	const response = await axios.delete(`${baseUrl}/${object.id}`, { headers })
	return response.data
}

export default { getAll, create, update, setToken, remove }
