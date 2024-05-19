import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'express-async-errors'

import { PORT } from './utils/config.js'
import { MONGODB_URI } from './utils/config.js'

import loginRouter from './controllers/login.js'
import logoutRouter from './controllers/logout.js'
import userRouter from './controllers/users.js'

const app = express()

mongoose.set('strictQuery', false)
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/signUp', userRouter)
// app.use('/api/storage', storage)

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
