import { useQueryClient, useMutation } from '@tanstack/react-query'

import storageService from '../services/storage'

const PasswordForm = () => {
	const queryClient = useQueryClient()

	const createNewPassword = useMutation({
		mutationFn: storageService.create,
		onSuccess: () => {
			queryClient.invalidateQueries(['passwords'])
		},
		onError: (error) => {
			console.log('Error', error)
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

		createNewPassword.mutate(newPassword)
	}

	return (
		<>
			<h2>Create new password</h2>
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
			</form>
		</>
	)
}

export default PasswordForm
