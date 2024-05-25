import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
	const { username, password } = req.body
	const ROUNDS = Number(process.env.SALT_ROUNDS)

	if (username.length < 3) {
		return res
			.status(400)
			.json({ error: 'Username should have at least 3 symbols' })
	}

	const checkName = await User.findOne({ username })

	if (checkName) {
		return res.status(401).json({ error: 'Username should be unique' })
	}

	if (password.length < 6) {
		return res
			.status(400)
			.json({ error: 'Password should have at least 6 symbols' })
	}

	const passwordHash = await bcrypt.hash(password, ROUNDS)

	const user = new User({
		username,
		passwordHash,
	})

	const savedUser = await user.save()

	console.log('User created', user)
	res.status(201).json(savedUser)
})

export default router
