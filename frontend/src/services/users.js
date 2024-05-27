import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const signUp = async (credentials) => {
	const response = axios.post(baseUrl, credentials)

	return response.data
}

export default { signUp }
