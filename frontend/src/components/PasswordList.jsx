import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import storageService from '../services/storage'

import PasswordForm from './PasswordForm'

const PasswordList = () => {
	const { id } = useParams()
	const {
		data: passwords,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['passwords'],
		queryFn: storageService.getAll,
		refetchOnWindowFocus: false,
	})

	if (isLoading) return <div>Data is loading...</div>
	if (isError) return <div>There is an error!</div>

	return (
		<>
			<div>
				<h2>Passwords</h2>
				<ul>
					{passwords?.map((password) => (
						<li key={password.id}>
							<Link to={`/user/${id}/password/${password.id}`}>
								{password.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<PasswordForm />
		</>
	)
}

export default PasswordList
