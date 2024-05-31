import { useQuery } from '@tanstack/react-query'
import storageService from '../services/storage'

import PasswordForm from './PasswordForm'

const PasswordList = () => {
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

	console.log('Data', passwords)
	return (
		<>
			<div>
				<h2>Passwords</h2>
				<ul>
					{passwords?.map((password) => (
						<li key={password.id}>
							<strong>{password.name}</strong>
							<p>{password.description}</p>
							<p>{password.password}</p>
						</li>
					))}
				</ul>
			</div>
			<PasswordForm />
		</>
	)
}

export default PasswordList
