import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const activeSessionSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
	expiresAt: {
		type: Date,
		required: true,
	},
})

activeSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })
activeSessionSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('ActiveSession', activeSessionSchema)
