import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		minLength: 3,
	},
	passwordHash: {
		type: String,
		required: true,
		minLength: 6,
	},
})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)
