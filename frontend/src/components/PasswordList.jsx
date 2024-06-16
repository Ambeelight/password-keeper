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
		<div className='flex flex-col items-center min-h-screen bg-gray-100 dark:bg-slate-950 py-24'>
			<PasswordForm />
			<div className='w-full max-w-2xl p-8 mt-8 space-y-6 bg-white dark:bg-slate-900 border border-gray-300 dark:border-indigo-500 rounded-lg shadow-lg'>
				<h2 className='text-2xl font-bold dark:text-white'>Passwords</h2>
				<ul className='list-disc pl-6 space-y-2 dark:text-indigo-500'>
					{passwords && passwords.length > 0 ? (
						passwords.map((password) => (
							<li key={password.id}>
								<Link
									to={`/user/${id}/password/${password.id}`}
									className='text-lg  text-indigo-600 hover:underline'
								>
									{password.name}
								</Link>
							</li>
						))
					) : (
						<div className='text-gray-600'>Your password list is empty</div>
					)}
				</ul>
			</div>
		</div>
	)
}

export default PasswordList
