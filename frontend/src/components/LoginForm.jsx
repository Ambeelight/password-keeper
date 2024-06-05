import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'

import loginService from '../services/login'
import storageService from '../services/storage'

import { useLogIn } from '../UserContext'
import { useNotification } from '../NotificationContext'

const LoginForm = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const logIn = useLogIn()
	const notification = useNotification()

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.login({ username, password })

			window.sessionStorage.setItem('loggedUser', JSON.stringify(user))
			storageService.setToken(user.token)
			logIn(user)
			console.log('USER', user)
			notification(`Welcome ${user.username}`, 'success')

			queryClient.invalidateQueries(['blogs'])
			navigate(`/user/${user.id}`)

			setUsername('')
			setPassword('')
		} catch (error) {
			notification('Wrong username or password', error)
		}
	}

	return (
		<div>
			<h2>Log in</h2>
			<form onSubmit={handleLogin}>
				<div>
					Username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
						autoComplete='off'
						required
					/>
				</div>
				<div>
					Password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
						autoComplete='off'
						required
					/>
				</div>
				<button type='submit'>Log in</button>
			</form>
			<div>
				<Link to={'/signup'}>Sign up</Link>
			</div>
		</div>
	)
}

export default LoginForm
