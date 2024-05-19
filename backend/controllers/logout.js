import express from 'express'

import activeSession from '../models/activeSession.js'
import { tokenExtractor, validToken } from '../utils/middleware.js'

const router = express.Router()

router.delete('/', tokenExtractor, validToken, async (req, res) => {
	const token = req.validToken
	console.log('LogOutToken', token)

	if (token) {
		const session = await activeSession.findOne({ token })
		console.log('SessionToken', session)

		if (session) {
			await session.deleteOne()
			res.status(200).json({ message: 'You have logged out' })
			console.log('You have logged out')
		} else {
			res.status(401).json({ error: 'session not found' })
		}
	} else {
		res.status(401).json({ error: 'token invalid' })
	}
})

export default router
