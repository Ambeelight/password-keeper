import express from 'express'
import { encrypt, decrypt } from '../utils/encryption.js'
import Password from '../models/password.js'
import { validSessionToken, userExtractor } from '../utils/middleware.js'

const router = express.Router()

router.get('/', validSessionToken, userExtractor, async (req, res) => {
	const session = req.validSessionToken
	const user = req.user

	if (!session) res.status(401).json({ error: 'Token invalid' })

	const passwords = await Password.find({ userId: user.id })

	if (!passwords) res.status(200).json({ message: 'Storage is empty' })

	const decryptedPasswords = passwords.map((pwd) => ({
		...pwd.toJSON(),
		password: decrypt(pwd.password),
	}))

	res.status(200).json(decryptedPasswords)
})

router.post('/', validSessionToken, userExtractor, async (req, res) => {
	const { name, description, password } = req.body
	const session = req.validSessionToken
	const user = req.user

	if (!name) {
		return res.status(400).json({ error: 'Name is missing' })
	}

	if (!password) {
		return res.status(400).json({ error: 'Password is missing' })
	}

	if (!session) {
		res.status(401).json({ message: 'Your token has been expired' })
	}

	const encryptedPassword = encrypt(password)

	const newPassword = new Password({
		name,
		description,
		password: encryptedPassword,
		userId: user.id,
	})

	const savedPassword = await newPassword.save()

	res.status(201).json(savedPassword)
})

router.put('/:id', validSessionToken, async (req, res) => {
	const session = req.validSessionToken
	const body = req.body
	const passwordId = req.params.id

	if (!session) res.status(401).json({ message: 'Your token has been expired' })

	if (!body) res.status(400).json({ error: 'Request body is empty' })

	const encryptedPassword = encrypt(body?.password)

	const password = {
		name: body?.name,
		description: body?.description,
		password: encryptedPassword,
	}

	const result = await Password.findByIdAndUpdate(passwordId, password, {
		new: true,
	})

	if (!result) return res.status(404).json({ error: 'Password not found' })

	res.status(200).json(result)
})

router.delete('/:id', validSessionToken, async (req, res) => {
	const session = req.validSessionToken
	const passwordId = req.params.id

	if (!session) res.status(401).json({ message: 'Your token has been expired' })

	const result = await Password.findByIdAndDelete(passwordId)
	res.status(201).json(result)
})

export default router
