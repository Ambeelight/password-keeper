import { useNotificationValue } from '../NotificationContext'

export const Notification = () => {
	const notification = useNotificationValue()

	if (!(notification && notification.message)) return null

	return (
		<div
			className={`${
				notification.type === 'success' ? 'text-green-600' : 'text-red-600'
			} 
			fixed top-0 left-1/2 transform -translate-x-1/2  bg-white text-center text-2xl font-bold border border-solid border-gray-300 rounded p-4 mb-4 shadow-lg z-20`}
		>
			{notification.message}
		</div>
	)
}

export default Notification
