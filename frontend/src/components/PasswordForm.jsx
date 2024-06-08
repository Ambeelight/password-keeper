import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import storageService from '../services/storage'

import { useNotification } from '../NotificationContext'

const PasswordForm = () => {
	const queryClient = useQueryClient()
	const notification = useNotification()

	const [isCreating, setIsCreating] = useState(false)

	const createNewPasswordMutation = useMutation({
		mutationFn: storageService.create,
		onSuccess: () => {
			queryClient.invalidateQueries(['passwords'])
			notification(`New password has been created`, 'success')
		},
		onError: (error) => {
			notification(`Error ${error} of creating a new password`)
		},
	})

	const newPasswordData = (event) => {
		event.preventDefault()

		const newPassword = {
			name: event.target.name.value,
			description: event.target.description.value,
			password: event.target.password.value,
		}

		event.target.name.value = ''
		event.target.description.value = ''
		event.target.password.value = ''

		createNewPasswordMutation.mutate(newPassword)
	}

	const handleFormClick = (editState) => {
		setIsCreating(!editState)
	}

	return (
		<>
			<h2>Create new password</h2>
			{isCreating ? (
				<form onSubmit={newPasswordData}>
					<div>
						<div>name:</div>
						<input
							id='name'
							type='text'
							autoComplete='off'
							placeholder='write a name'
						/>
					</div>
					<div>
						<div>description:</div>
						<input
							id='description'
							type='text'
							autoComplete='off'
							placeholder='add description'
						/>
					</div>
					<div>
						<div>password:</div>
						<input
							id='password'
							type='password'
							autoComplete='off'
							placeholder='write password'
						/>
					</div>
					<input id='addPassword' type='submit' value='Create' />
					<button type='button' onClick={() => handleFormClick(isCreating)}>
						Cancel
					</button>
				</form>
			) : (
				<button onClick={() => handleFormClick(isCreating)}>+</button>
			)}
		</>
	)
}

export default PasswordForm
