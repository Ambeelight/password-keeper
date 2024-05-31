import crypto from 'crypto'

const algorithm = 'aes-256-ctr'
const secretKey = process.env.ENCRYPTION_KEY

if (!secretKey || secretKey.length !== 64) {
	throw new Error('Invalid secretKey length. Must be 32 bytes')
}

const keyBuffer = Buffer.from(secretKey, 'hex')

export const encrypt = (text) => {
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv)
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

export const decrypt = (hash) => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		keyBuffer,
		Buffer.from(hash.iv, 'hex')
	)
	const decrypted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	])

	return decrypted.toString()
}
