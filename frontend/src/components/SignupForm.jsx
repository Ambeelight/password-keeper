import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import userService from '../services/users'

import { useNotification } from '../NotificationContext'

const SignupForm = () => {
	const navigate = useNavigate()
	const notification = useNotification()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

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

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='w-full max-w-md p-8 space-y-6 bg-white border border-gray-300 rounded-lg shadow-lg'>
				<h2 className='text-center text-2xl font-bold'>Registration</h2>
				<form className='space-y-6' onSubmit={newUser}>
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
							id='newUserPassword'
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
							id='createUser'
							className='w-full rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Create Account
						</button>
						<Link
							to={'/'}
							className='w-full text-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Cancel
						</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignupForm
