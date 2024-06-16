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
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white border border-gray-300 dark:bg-slate-900 dark:border-indigo-500 rounded-lg shadow-lg'>
				<h2 className='text-center text-2xl font-bold dark:text-white'>
					Log in to the storage
				</h2>
				<form className='space-y-6' onSubmit={handleLogin}>
					<div>
						<label className='block text-base font-medium leading-6 text-gray-900 dark:text-white'>
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
						/>
					</div>
					<div>
						<label className='block text-base font-medium leading-6 text-gray-900 dark:text-white'>
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
						/>
					</div>
					<div className='flex flex-col items-center space-y-4'>
						<button type='submit' id='login' className='btn-submit'>
							Log in
						</button>
						<Link to={'/signup'} className='text-center btn-submit'>
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
