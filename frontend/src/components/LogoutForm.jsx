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
		<div className='absolute w-full top-0  bg-white border-b-2 border-gray-300 z-10'>
			<div className='flex flex-wrap justify-evenly content-center items-center h-16'>
				<h3 className=' text-lg text-black font-semibold'>
					{user.username} is logged in
				</h3>
				<button
					onClick={handleLogout}
					className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
				>
					logout
				</button>
			</div>
		</div>
	)
}

export default LogoutForm
