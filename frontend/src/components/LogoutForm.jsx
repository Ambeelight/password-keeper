import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { useLogOut, useUserValue } from '../UserContext'
import { useNotification } from '../NotificationContext'
import logoutService from '../services/logout'

const LogoutForm = () => {
	const user = useUserValue()
	const logOut = useLogOut()
	const navigate = useNavigate()
	const notification = useNotification()

	const logoutMutation = useMutation({
		mutationFn: logoutService.logout,
		onSuccess: () => {
			window.sessionStorage.removeItem('loggedUser')
			logOut()
			notification(`User ${user.username} logged out`, 'success')
			navigate('/')
		},
		onError: (error) => {
			notification(error.response?.data?.error || 'Logout failed')
		},
	})

	const handleLogout = (event) => {
		event.preventDefault()
		logoutService.setToken(user.token)
		logoutMutation.mutate()
	}

	return (
		<>
			<h3>{user.username} is logged in</h3>
			<button onClick={handleLogout}>logout</button>
		</>
	)
}

export default LogoutForm
