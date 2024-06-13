import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import storageService from '../services/storage'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNotification } from '../NotificationContext'

const Password = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { id } = useParams()
	const notification = useNotification()

	const [isEditing, setIsEditing] = useState(false)
	const [editedPassword, setEditedPassword] = useState({
		id: '',
		name: '',
		description: '',
		password: '',
	})

	const {
		data: password,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['password', id],
		queryFn: () => storageService.getPasswordById(id),
		refetchOnWindowFocus: false,
	})

	useEffect(() => {
		if (password) {
			setEditedPassword({
				id: password.id,
				name: password.name,
				description: password.description,
				password: password.password,
			})
		}
	}, [password])

	const updatePasswordMutation = useMutation({
		mutationFn: storageService.update,
		onSuccess: () => {
			queryClient.invalidateQueries(['passwords'])
			setIsEditing(false)
			notification('Password has been updated', 'success')
		},
		onError: (error) => {
			notification(error.response.data.error)
		},
	})

	const updatePassword = (password) => {
		updatePasswordMutation.mutate(password)
	}

	const removePasswordMutation = useMutation({
		mutationFn: storageService.remove,
		onSuccess: (password) => {
			queryClient.invalidateQueries(['passwords'])
			navigate(`/user/${password.userId}`)
			notification(`Password ${password.name} has been deleted`, 'success')
		},
		onError: (error) => {
			notification(error.response.data.error)
		},
	})

	const removePassword = (password) => {
		if (window.confirm(`Remove ${password.name}?`)) {
			removePasswordMutation.mutate(password)
		}
	}

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error loading password</div>

	const handleChange = (e) => {
		const { name, value } = e.target
		setEditedPassword({
			...editedPassword,
			[name]: value,
		})
	}

	const handleEditClick = (editState) => {
		setIsEditing(!editState)
	}

	return (
		<div className='max-w-lg mx-auto mt-24 p-4 bg-white shadow-md rounded-lg'>
			<h2 className='text-xl font-bold mb-4'>
				{isEditing ? 'Edit Password' : 'Password Details'}
			</h2>
			{isEditing ? (
				<form>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Name
						</label>
						<input
							type='text'
							name='name'
							value={editedPassword.name}
							onChange={handleChange}
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Description
						</label>
						<input
							type='text'
							name='description'
							value={editedPassword.description}
							onChange={handleChange}
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700 text-sm font-bold mb-2'>
							Password
						</label>
						<input
							type='text'
							name='password'
							value={editedPassword.password}
							onChange={handleChange}
							className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
						/>
					</div>
					<div className='flex justify-between'>
						<button
							type='button'
							onClick={() => updatePassword(editedPassword)}
							className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300'
						>
							Save
						</button>
						<button
							type='button'
							onClick={handleEditClick}
							className='bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300'
						>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<div>
					<div className='mb-4'>
						<strong>Name:</strong> {password.name}
					</div>
					<div className='mb-4'>
						<strong>Description:</strong> {password.description}
					</div>
					<div className='mb-4'>
						<strong>Password:</strong> {password.password}
					</div>
					<div className='flex'>
						<button
							onClick={() => handleEditClick()}
							className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300'
						>
							Edit
						</button>
						<button
							onClick={() => removePassword(password)}
							className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300'
						>
							Delete
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Password
