import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import { useLogIn } from '../UserContext'
import loginService from '../services/login'

const LoginForm = () => {
	const logIn = useLogIn()
	const navigate = useNavigate()

	const loginMutation = useMutation({
		mutationFn: loginService.login,
		onSuccess: (data) => {
			const { token, username, id, expiresAt } = data
			const loggedUser = { token, username, id, expiresAt }
			window.sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
			logIn(loggedUser)
			navigate(`/user/${id}`)
		},
		onError: (error) => {
			console.log('Error', error)
		},
	})

	const handleLogin = (event) => {
		event.preventDefault()
		const user = {
			username: event.target.username.value,
			password: event.target.password.value,
		}
		loginMutation.mutate(user)
	}

	return (
		<>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
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
						id='password'
						type='password'
						name='password'
						autoComplete='off'
						placeholder='your password'
					/>
				</div>
				<input type='submit' id='login' />
				<Link to={'/signup'}>Sign Up</Link>
			</form>
		</>
	)
}

export default LoginForm
