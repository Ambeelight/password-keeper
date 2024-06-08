import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import userService from '../services/users'

import { useNotification } from '../NotificationContext'

const SignupForm = () => {
	const navigate = useNavigate()
	const notification = useNotification()

	const createNewUser = useMutation({
		mutationFn: userService.signUp,
		onSuccess: () => {
			notification(`Your account successfully created.`, 'success')
			navigate(`/`)
		},
		onError: (error) => {
			notification(`Error ${error} of creating a new account`)
		},
	})

	const newUser = (event) => {
		event.preventDefault()

		const user = {
			username: event.target.username.value,
			password: event.target.password.value,
		}

		event.target.username.value = ''
		event.target.password.value = ''

		createNewUser.mutate(user)
	}

	return (
		<>
			<h2>Registration</h2>
			<form onSubmit={newUser}>
				<div>
					<div>username:</div>
					<input
						id='username'
						type='text'
						name='username'
						autoComplete='off'
						placeholder='your username'
					/>
				</div>
				<div>
					<div>password:</div>
					<input
						id='newUserPassword'
						type='password'
						name='password'
						autoComplete='off'
						placeholder='your password'
					/>
				</div>
				<input type='submit' id='createUser' />
				<Link to={'/'}>Cancel</Link>
			</form>
		</>
	)
}

export default SignupForm
