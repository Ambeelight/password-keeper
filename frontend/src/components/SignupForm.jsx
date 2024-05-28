import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import userService from '../services/users'

const SignupForm = () => {
	const navigate = useNavigate()

	const createNewUser = useMutation({
		mutationFn: userService.signUp,
		onSuccess: () => {
			navigate(`/`)
		},
		onError: (error) => {
			console.log('Error', error)
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
						name='newUserPassword'
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
