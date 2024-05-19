import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const passwordSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
})

passwordSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	},
})

passwordSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('Password', passwordSchema)
