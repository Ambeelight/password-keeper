import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useLogIn } from './UserContext'
import { useUserValue } from './UserContext'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import LogoutForm from './components/LogoutForm'
import PasswordList from './components/PasswordList'
import PasswordForm from './components/PasswordForm'

import storageService from './services/storage'

const App = () => {
	const logIn = useLogIn()
	const navigate = useNavigate()
	const user = useUserValue()

	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)
			logIn(loggedUser)
			storageService.setToken(loggedUser.token)
		} else {
			const currentPath = window.location.pathname
			if (currentPath !== '/signup') {
				navigate('/')
			}
		}
	}, [navigate])

	return (
		<>
			{user && <LogoutForm />}
			<Notification />

			<Routes>
				<Route path='/' element={<LoginForm />} />
				<Route path='/signup' element={<SignupForm />} />

				<Route path='/user/:id' element={<PasswordList />} />
			</Routes>
		</>
	)
}

export default App
