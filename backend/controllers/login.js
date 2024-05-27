import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user.js'
import ActiveSession from '../models/activeSession.js'

const SECRET = process.env.SECRET
const router = express.Router()

router.post('/', async (req, res) => {
	const { username, password } = req.body
	const user = await User.findOne({ username })

	if (!user) res.status(401).json({ error: 'invalid login' })

	const checkPassword =
		user === null ? false : await bcrypt.compare(password, user.passwordHash)

	if (!checkPassword) res.status(401).json({ error: 'invalid password' })

	const userForToken = {
		username: user.username,
		id: user.id,
	}

	const token = jwt.sign(userForToken, SECRET, { expiresIn: '45m' })

	const expiresAt = new Date(Date.now() + 45 * 60 * 1000)
	const newSession = new ActiveSession({ token, expiresAt })
	newSession.save()

	if (!newSession) res.status(500).json({ error: 'could not create a session' })

	res.status(200).send({ token, username: user.username, id: user.id })
})

export default router
