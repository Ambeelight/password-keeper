import { useNavigate } from 'react-router-dom'

import { useLogOut, useUserValue } from '../UserContext'
import { useNotification } from '../NotificationContext'
import logoutService from '../services/logout'

const LogoutForm = () => {
	const user = useUserValue()
	const logOut = useLogOut()
	const navigate = useNavigate()
	const notification = useNotification()

	const handleLogout = async (event) => {
		event.preventDefault()

		try {
			window.sessionStorage.removeItem('loggedUser')
			logoutService.setToken(user.token)
			await logoutService.logout()
			logOut()
			notification(`User ${user.username} logged out`, 'success')
		} catch (error) {
			notification(error.response.data.error)
		}

		navigate('/')
	}

	return (
		<>
			<h3>{user.username} is logged in</h3>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}

export default LogoutForm
