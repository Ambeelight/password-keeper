import jwt from 'jsonwebtoken'
import ActiveSession from '../models/activeSession.js'

const SECRET = process.env.SECRET

//token extractor
export const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			console.log(authorization.substring(7))
			req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
		} catch (error) {
			console.log(error)
			return res.status(401).json({ error: 'token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}

	next()
}

export const validToken = async (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		try {
			console.log(authorization.substring(7))
			const token = authorization.substring(7)
			req.validToken = token
		} catch (error) {
			console.log(error)
			return res.status(401).json({ error: 'token invalid' })
		}
	} else {
		return res.status(401).json({ error: 'token missing' })
	}

	next()
}
