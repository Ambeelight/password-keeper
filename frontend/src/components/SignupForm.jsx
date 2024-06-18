import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import userService from '../services/users'

import { useNotification } from '../NotificationContext'
import PasswordVisibility from './PasswordVisibility'

const SignupForm = () => {
	const navigate = useNavigate()
	const notification = useNotification()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [visibility, setVisibility] = useState(false)

	const createNewUser = useMutation({
		mutationFn: userService.signUp,
		onSuccess: () => {
			notification(`Your account successfully created.`, 'success')
			navigate(`/`)
			setUsername('')
			setPassword('')
		},
		onError: (error) => {
			notification(`Error ${error} of creating a new account`)
		},
	})

	const newUser = (event) => {
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

		createNewUser.mutate(user)
	}

	const handleVisibility = () => {
		setVisibility(!visibility)
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-950'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white border border-gray-300 dark:bg-slate-900 dark:border-indigo-500 rounded-lg shadow-lg'>
				<h2 className='text-center text-2xl font-bold dark:text-white'>
					Registration
				</h2>
				<form className='space-y-6' onSubmit={newUser}>
					<div>
						<label className='form-input__name'>Username:</label>
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
						<label className='form-input__name'>Password:</label>
						<input
							id='newUserPassword'
							type={visibility ? 'text' : 'password'}
							name='password'
							autoComplete='off'
							placeholder='your password'
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						<PasswordVisibility
							visibility={visibility}
							toggleVisibility={handleVisibility}
						/>
					</div>
					<div className='flex flex-col items-center space-y-4'>
						<button type='submit' id='createUser' className='btn-submit'>
							Create Account
						</button>
						<Link to={'/'} className='text-center btn-submit'>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignupForm
