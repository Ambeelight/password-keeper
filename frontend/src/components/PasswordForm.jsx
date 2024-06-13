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
		<div className='w-full max-w-2xl p-8 space-y-6 bg-white border border-gray-300 rounded-lg shadow-lg'>
			<div className='flex items-center content-center justify-between'>
				<h2 className='text-xl font-bold'>Create new password</h2>
				<button
					onClick={() => handleFormClick(isCreating)}
					className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
				>
					{isCreating ? '−' : '+'}
				</button>
			</div>
			{isCreating && (
				<form
					className={`space-y-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
						isCreating ? 'max-h-96' : 'max-h-0'
					}`}
					onSubmit={newPasswordData}
				>
					<div>
						<div className='mb-1'>Name:</div>
						<input
							id='name'
							type='text'
							autoComplete='off'
							placeholder='Write a name'
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<div className='mb-1'>Description:</div>
						<input
							id='description'
							type='text'
							autoComplete='off'
							placeholder='Add description'
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div>
						<div className='mb-1'>Password:</div>
						<input
							id='password'
							type='text'
							autoComplete='off'
							placeholder='Write password'
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div className='flex justify-around items-center'>
						<button
							type='submit'
							id='addPassword'
							className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
						>
							Create
						</button>
						<button
							type='button'
							onClick={() => handleFormClick(isCreating)}
							className='bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300'
						>
							Cancel
						</button>
					</div>
				</form>
			)}
		</div>
	)
}

export default PasswordForm
