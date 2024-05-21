import express from 'express'

import { validSessionToken } from '../utils/middleware.js'

const router = express.Router()

router.delete('/', validSessionToken, async (req, res) => {
	const token = req.validSessionToken
	console.log('LogOutToken', token)

	if (token) {
		console.log('SessionToken', token)

		await token.deleteOne()
		res.status(200).json({ message: 'You have logged out' })
		console.log('You have logged out')
	} else {
		res.status(401).json({ error: 'token invalid' })
	}
})

export default router
