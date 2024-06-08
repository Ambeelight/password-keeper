import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { useLogIn, useLogOut } from './UserContext'
import { useUserValue } from './UserContext'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import LogoutForm from './components/LogoutForm'
import PasswordList from './components/PasswordList'
import Password from './components/Password'

import storageService from './services/storage'

const App = () => {
	const logIn = useLogIn()
	const logOut = useLogOut()
	const navigate = useNavigate()
	const user = useUserValue()

	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const loggedUser = JSON.parse(loggedUserJSON)
			const expiresAt = new Date(loggedUser.expiresAt)
			const currentTime = new Date()

			if (expiresAt > currentTime) {
				logIn(loggedUser)
				storageService.setToken(loggedUser.token)
			} else {
				window.sessionStorage.removeItem('loggedUser')
				logOut()
				navigate('/')
			}
		} else {
			const currentPath = window.location.pathname
			if (currentPath !== '/signup') {
				navigate('/')
			}
		}
	}, [navigate])

	useEffect(() => {
		if (user) {
			navigate(`/user/${user.id}`)
		}
	}, [navigate, user])

	return (
		<>
			{user && <LogoutForm />}
			<Notification />

			<Routes>
				<Route path='/' element={<LoginForm />} />
				<Route path='/signup' element={<SignupForm />} />

				<Route path='/user/:id' element={<PasswordList />} />
				<Route path='/user/:id/password/:id' element={<Password />} />
			</Routes>
		</>
	)
}

export default App
