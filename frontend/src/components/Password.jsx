import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import storageService from '../services/storage'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Password = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const { id } = useParams()

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
		},
		onError: (error) => {
			console.log('Error', error)
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
		},
		onError: (error) => {
			console.log('Error', error)
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
		<>
			{isEditing ? (
				<div>
					<h2>Edit Password</h2>
					<div>
						<label>Name</label>
						<input
							type='text'
							name='name'
							value={editedPassword.name}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label>Description</label>
						<input
							type='text'
							name='description'
							value={editedPassword.description}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label>Password</label>
						<input
							type='text'
							name='password'
							value={editedPassword.password}
							onChange={handleChange}
						/>
					</div>
					<button type='button' onClick={() => updatePassword(editedPassword)}>
						Save
					</button>
					<button type='button' onClick={() => handleEditClick(isEditing)}>
						Cancel
					</button>
				</div>
			) : (
				<div>
					<h2>Password</h2>
					<div>
						Name:
						<span>{password.name}</span>
					</div>
					<div>
						Description:
						<span>{password.description}</span>
					</div>
					<div>
						Password:
						<span>{password.password}</span>
					</div>

					<button onClick={() => handleEditClick(isEditing)}>edit</button>
					<button onClick={() => removePassword(password)}>delete</button>
				</div>
			)}
		</>
	)
}

export default Password
