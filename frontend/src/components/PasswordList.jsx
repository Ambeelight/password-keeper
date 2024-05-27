import { useQuery } from '@tanstack/react-query'
import storageService from '../services/storage'

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
				{passwords?.map((password) => (
					<div key={password.id}>
						<h3>name: {password.name} </h3>
						<p>password: {password.password} </p>
					</div>
				))}
			</div>
		</>
	)
}

export default PasswordList
