import { useNotificationValue } from '../NotificationContext'

export const Notification = () => {
	const notification = useNotificationValue()

	if (!(notification && notification.message)) return null

	return (
		<div
			className={`${
				notification.type === 'success' ? 'color: green' : 'color: red'
			} 
       `}
		>
			{notification.message}
		</div>
	)
}

export default Notification
