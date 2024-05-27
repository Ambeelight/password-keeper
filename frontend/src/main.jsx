import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'

import { UserContextProvider } from './UserContext'
import { NotificationContextProvider } from './NotificationContext.jsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<UserContextProvider>
				<NotificationContextProvider>
					<Router>
						<App />
					</Router>
				</NotificationContextProvider>
			</UserContextProvider>
		</QueryClientProvider>
	</React.StrictMode>
)
