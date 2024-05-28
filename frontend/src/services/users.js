import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/user'

const signUp = async (newUser) => {
	const response = axios.post(`${baseUrl}/signup`, newUser)

	return response.data
}

export default { signUp }
