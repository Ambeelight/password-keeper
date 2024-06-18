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

	const handleFormClick = () => {
		setIsCreating(!isCreating)
	}

	return (
		<div className='w-full max-w-2xl p-8 bg-white dark:bg-slate-900 border border-gray-300 dark:border-indigo-500 rounded-lg shadow-lg'>
			<div className='flex items-center content-center justify-between'>
				<h2 className='text-xl font-bold dark:text-white mb-4'>
					Create new password
				</h2>
				<button
					onClick={() => handleFormClick()}
					className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
				>
					{isCreating ? '−' : '+'}
				</button>
			</div>
			<div
				className={`overflow-hidden transition-all duration-500 ease-linear ${
					isCreating ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'
				}`}
			>
				<form
					className='space-y-6 overflow-hidden dark:text-white'
					onSubmit={newPasswordData}
				>
					<div>
						<div className='mb-1'>Name:</div>
						<input
							id='name'
							type='text'
							autoComplete='off'
							placeholder='Write a name'
							required
						/>
					</div>
					<div>
						<div className='mb-1'>Description:</div>
						<input
							id='description'
							type='text'
							autoComplete='off'
							placeholder='Add description'
						/>
					</div>
					<div>
						<div className='mb-1'>Password:</div>
						<input
							id='password'
							type='text'
							autoComplete='off'
							placeholder='Write password'
							required
						/>
					</div>
					<div className='flex justify-between items-center'>
						<button
							type='submit'
							id='addPassword'
							onClick={() => handleFormClick(isCreating)}
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
			</div>
		</div>
	)
}

export default PasswordForm
