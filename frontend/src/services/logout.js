import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/logout'

let token = null
let headers = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
	headers = {
		Authorization: token,
	}
}

const logout = async (object) => {
	const response = axios.delete(`${baseUrl}/${object.id}`, { headers })

	return response.data
}

export { logout, setToken }
