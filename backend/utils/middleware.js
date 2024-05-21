import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import ActiveSession from '../models/activeSession.js'

const SECRET = process.env.SECRET

export const validSessionToken = async (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			const token = authorization.substring(7)
			const session = await ActiveSession.findOne({ token })

			req.validSessionToken = session
		} catch (error) {
			return res.status(401).json({ error: 'token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}

	next()
}

export const userExtractor = async (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		const token = authorization.substring(7)
		try {
			const decodedToken = jwt.verify(token, SECRET)

			if (!decodedToken.id) {
				return res.status(401).json({ error: 'Invalid token' })
			}

			const userId = decodedToken.id
			const user = await User.findById(userId)

			if (!user) {
				return res.status(401).json({ error: 'User not found' })
			}

			req.user = user
		} catch (error) {
			return res.status(401).json({ error: 'Invalid token' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}

	next()
}
