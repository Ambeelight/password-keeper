import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import { useLogIn } from '../UserContext'
import loginService from '../services/login'
import { useNotification } from '../NotificationContext'

const LoginForm = () => {
	const logIn = useLogIn()
	const navigate = useNavigate()
	const notification = useNotification()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const loginMutation = useMutation({
		mutationFn: loginService.login,
		onSuccess: (data) => {
			const { token, username, id, expiresAt } = data
			const loggedUser = { token, username, id, expiresAt }
			window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
			logIn(loggedUser)
			navigate(`/user/${id}`)

			setUsername('')
			setPassword('')
		},
		onError: (error) => {
			notification(`Error ${error} of log in`)
		},
	})

	const handleLogin = (event) => {
		event.preventDefault()
		if (username.length < 3) {
			notification('Username must be at least 3 characters long')
			return
		}
		if (password.length < 6) {
			notification('Password must be at least 6 characters long')
			return
		}
		const user = { username, password }

		loginMutation.mutate(user)
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white border border-gray-300 rounded-lg shadow-lg'>
				<h2 className='text-center text-2xl font-bold'>
					Log in to the storage
				</h2>
				<form className='space-y-6' onSubmit={handleLogin}>
					<div>
						<label className='block text-base font-medium leading-6 text-gray-900'>
							username
						</label>
						<input
							id='username'
							type='text'
							name='username'
							autoComplete='off'
							placeholder='your username'
							required
							onChange={(e) => setUsername(e.target.value)}
							className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
						/>
					</div>
					<div>
						<label className='block text-base font-medium leading-6 text-gray-900'>
							password
						</label>
						<input
							id='password'
							type='password'
							name='password'
							autoComplete='off'
							placeholder='your password'
							required
							onChange={(e) => setPassword(e.target.value)}
							className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
						/>
					</div>
					<div className='flex flex-col items-center space-y-4'>
						<button
							type='submit'
							id='login'
							className='w-full rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Log in
						</button>
						<Link
							to={'/signup'}
							className='w-full text-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
