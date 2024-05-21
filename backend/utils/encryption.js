import crypto from 'crypto'

const algorithm = 'aes-256-ctr'
const secretKey = crypto.randomBytes(16).toString('hex')
const iv = crypto.randomBytes(16)

if (secretKey.length !== 32) {
	throw new Error('Invalid ENCRYPTION_KEY length. Must be 32 bytes.')
}

export const encrypt = (text) => {
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv)
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

export const decrypt = (hash) => {
	const decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(secretKey),
		Buffer.from(hash.iv, 'hex')
	)
	const decrypted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	])

	return decrypted.toString()
}
