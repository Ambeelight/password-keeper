import { useNavigate } from 'react-router-dom'

import { useLogOut } from '../UserContext'
import { useUserValue } from '../UserContext'
import logoutService from '../services/logout'

const LogoutForm = () => {
	const user = useUserValue()
	const logOut = useLogOut()
	const navigate = useNavigate()

	const handleLogout = async (event) => {
		event.preventDefault()

		try {
			window.sessionStorage.removeItem('loggedUser')
			logoutService.setToken(user.token)
			await logoutService.logout()
			logOut()

			navigate('/')
		} catch (error) {
			console.error('Logout failed', error)
		}
	}

	return (
		<>
			<h3>{user.username} is logged in</h3>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}

export default LogoutForm
