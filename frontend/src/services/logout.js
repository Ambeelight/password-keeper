import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/logout'

let token = null
let headers = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
	headers = {
		authorization: token,
	}
}

const logout = async () => {
	const response = await axios.delete(baseUrl, { headers })

	return response.data
}

export default { logout, setToken }
